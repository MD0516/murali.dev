import { withErrorHandler } from "@/lib/asyncHandler";
import { sendMessage } from "@/lib/services/contact";
import { validateBody } from "@/lib/validate";
import { contactSchema } from "@/lib/validators/contact";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    console.log(body)
    const payload = validateBody(contactSchema, body);
    console.log(payload)

    await sendMessage(payload);

    return NextResponse.json({ message: "Message sent successfully", success: true }, { status: 200 })
})