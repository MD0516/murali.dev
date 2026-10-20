import { About as IAbout } from "@/types";
import About from "../models/About";
import { requireAdmin } from "../auth";
import { NotFoundError } from "../errors";
import { UpdateAboutPayload } from "../validators/about";
import connectDB, { UPDATE_OPTIONS } from "../db";

export const getAbout = async (): Promise<IAbout> => {
    await connectDB();

    const about = await About.findOne();

    if (!about) {
        throw new NotFoundError(
            "About not found — did you run the seed script?"
        );
    }

    return about;
};

export const updateAbout = async (
    data: UpdateAboutPayload
): Promise<IAbout> => {
    await connectDB();
    await requireAdmin();

    const about = await About.findOneAndUpdate(
        {},
        data,
        UPDATE_OPTIONS
    );

    if (!about) {
        throw new NotFoundError("About not found");
    }

    return about;
};