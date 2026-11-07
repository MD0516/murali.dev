import { withErrorHandler } from "@/lib/asyncHandler";
import { uploadImage } from "@/lib/services/upload";
import { validateBody } from "@/lib/validate";
import { uploadFileSchema, uploadQuerySchema } from "@/lib/validators/upload";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
    const formdata = await req.formData();
    const file = formdata.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    validateBody(uploadQuerySchema, req.nextUrl.searchParams);
    validateBody(uploadFileSchema, { file })
    
    const type = req.nextUrl.searchParams.get("type") as "image" | "resume";
    const url = await uploadImage(file, type);

    return NextResponse.json({ message: `${type === "image" ? "Image" : "Resume"} uploaded successfully`, data: { url } }, { status: 200 });
})