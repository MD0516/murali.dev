import { withErrorHandler } from "@/lib/asyncHandler";
import { createSkill, getSkills } from "@/lib/services/skills";
import { validateBody } from "@/lib/validate";
import { createSkillSchema } from "@/lib/validators/skill";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    const data = await getSkills();

    return NextResponse.json({ message: "Skills fetched successfully", data }, { status: 200 })
})

export const POST = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const payload = validateBody(createSkillSchema, body);

    const data = await createSkill(payload)

    return NextResponse.json({ message: "Skills created successfully", data }, { status: 201 })
})

