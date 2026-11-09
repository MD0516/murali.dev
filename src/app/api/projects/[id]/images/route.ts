import { withErrorHandler } from "@/lib/asyncHandler";
import { deleteImage } from "@/lib/services/projects";
import { validateBody } from "@/lib/validate";
import { deleteImageSchema } from "@/lib/validators/project";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const body = await req.json();
    const { imageUrl } = validateBody(deleteImageSchema, body);

    await deleteImage(id, imageUrl)

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 })
})