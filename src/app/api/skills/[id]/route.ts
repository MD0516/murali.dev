import { withErrorHandler } from "@/lib/asyncHandler";
import { deleteSkill, updateSkill } from "@/lib/services/skills";
import { validateBody } from "@/lib/validate";
import { updateSkillSchema } from "@/lib/validators/skill";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const body = await req.json();
    const payload = validateBody(updateSkillSchema, body);

    const data = await updateSkill(id, payload)

    return NextResponse.json({ message: "Project updated successfully", data }, { status: 200 })
})

export const DELETE = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const success = await deleteSkill(id)

    return NextResponse.json(
        { message: `Skill ${success ? "deleted successfully" : "deletion failed"}` },
        { status: success ? 200 : 400 }
    )
})