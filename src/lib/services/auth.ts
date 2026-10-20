import { AdminUser } from "@/types";
import { createSession, getSession } from "../auth";
import connectDB from "../db";
import { NotFoundError, UnauthorizedError } from "../errors";
import Admin from "../models/AdminUser";
import { LoginPayload } from "../validators/login";

export const login = async (data: LoginPayload) => {
    await connectDB();

    const admin = await Admin.findOne({ email: data.email }).select("+password");

    if (!admin || !(await admin.comparePassword(data.password))) {
        return new UnauthorizedError("Invalid credentials");
    }

    await createSession(
        { adminId: admin._id.toString(), isAdmin: true },
        data.rememberMe
    );
};

export const getAdmin = async (): Promise<AdminUser> => {
    await connectDB();

    const session = await getSession();

    const user = await Admin.findById(session?.adminId);

    if (!user) {
        throw new NotFoundError("Admin not found");
    }

    const data = { isAdmin: true, ...user.toObject() }

    return data;
};