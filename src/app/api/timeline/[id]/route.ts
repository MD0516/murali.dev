import { withErrorHandler } from "@/lib/asyncHandler";
import { deleteTimeLine, updateTimeLine } from "@/lib/services/timeline";
import { validateBody } from "@/lib/validate";
import { updateTimelineSchema } from "@/lib/validators/timeline";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const body = await req.json();
    const payload = validateBody(updateTimelineSchema, body);

    const data = await updateTimeLine(id, payload)

    return NextResponse.json({ message: "Project updated successfully", data }, { status: 200 })
})

export const DELETE = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const success = await deleteTimeLine(id)

    return NextResponse.json(
        { message: `Timeline ${success ? "deleted successfully" : "deletion failed"}` },
        { status: success ? 200 : 400 }
    )
})