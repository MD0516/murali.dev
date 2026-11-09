import { withErrorHandler } from "@/lib/asyncHandler";
import { uploadFiles } from "@/lib/services/upload";
import { validateBody } from "@/lib/validate";
import { uploadFileSchema, uploadQuerySchema } from "@/lib/validators/upload";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
    validateBody(uploadQuerySchema, req.nextUrl.searchParams);

    const formdata = await req.formData();
    const files = formdata.getAll("files").filter(
        (value): value is File => value instanceof File
    );
    
    const validated = validateBody(uploadFileSchema, { files })
    
    const type = req.nextUrl.searchParams.get("type") as "image" | "resume";

    const urls = await uploadFiles(validated.files, type);

    return NextResponse.json({ message: `${type === "image" ? "Image" : "Resume"} uploaded successfully`, data: { urls } }, { status: 200 });
})