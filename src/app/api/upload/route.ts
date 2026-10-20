import { withErrorHandler } from "@/lib/asyncHandler";
import { uploadImage } from "@/lib/services/upload";
import { validateBody } from "@/lib/validate";
import { uploadImageSchema } from "@/lib/validators/upload";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
    const formdata = await req.formData();
    const file = formdata.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    validateBody(uploadImageSchema, file)

    const url = await uploadImage(file);

    return NextResponse.json({ message: "Image uploaded successfully", data: { url } }, { status: 400 });
})