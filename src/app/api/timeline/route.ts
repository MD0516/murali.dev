import { withErrorHandler } from "@/lib/asyncHandler";
import { createTimeLine, getTimelines } from "@/lib/services/timeline";
import { validateBody } from "@/lib/validate";
import { createTimelineSchema } from "@/lib/validators/timeline";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    const data = await getTimelines();

    return NextResponse.json({ message: "Timeline fetched successfully", data }, { status: 200 })
})

export const POST = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const payload = validateBody(createTimelineSchema, body);

    const data = await createTimeLine(payload)

    return NextResponse.json({ message: "Skills created successfully", data }, { status: 201 })
})

