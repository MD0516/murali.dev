import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/services/auth";
import { validateBody } from "@/lib/validate";
import { loginSchema } from "@/lib/validators/login";
import { withErrorHandler } from "@/lib/asyncHandler";

export const POST = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const data = validateBody(loginSchema, body)
    await login(data);
    return NextResponse.json({ message: "Login success" }, { status: 200 })
})