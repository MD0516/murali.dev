import { withErrorHandler } from "@/lib/asyncHandler";
import { getAbout, updateAbout } from "@/lib/services/about";
import { validateBody } from "@/lib/validate";
import { updateAboutSchema } from "@/lib/validators/about";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    const data = await getAbout();

    return NextResponse.json({ message: "About fetched successfully", data }, { status: 200 })
})

export const PATCH = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const updates = validateBody(updateAboutSchema, body);

    const data = await updateAbout(updates)
    return NextResponse.json({ message: "About updated successfully", data }, { status: 200 })
})