import { withErrorHandler } from "@/lib/asyncHandler";
import { reorderSkills } from "@/lib/services/skills";
import { validateBody } from "@/lib/validate";
import { reorderSchema } from "@/lib/validators/common";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const payload = validateBody(reorderSchema, body);

    await reorderSkills(payload)

    return NextResponse.json({ message: "Skills reordered successfully" }, { status: 200 })
})