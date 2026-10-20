import { withErrorHandler } from "@/lib/asyncHandler";
import { reorderTimelines } from "@/lib/services/timeline";
import { validateBody } from "@/lib/validate";
import { reorderSchema } from "@/lib/validators/common";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const payload = validateBody(reorderSchema, body);

    await reorderTimelines(payload)

    return NextResponse.json({ message: "Timeline reordered successfully" }, { status: 200 })
})