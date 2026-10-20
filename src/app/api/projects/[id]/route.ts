import { withErrorHandler } from "@/lib/asyncHandler";
import { deleteProject, updateProject } from "@/lib/services/projects";
import { validateBody } from "@/lib/validate";
import { updateProjectSchema } from "@/lib/validators/project";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const body = await req.json();
    const payload = validateBody(updateProjectSchema, body);

    const data = await updateProject(id, payload)

    return NextResponse.json({ message: "Project updated successfully", data }, { status: 200 })
})

export const DELETE = withErrorHandler(async (req: NextRequest, { params }) => {
    const { id } = await params;

    const success = await deleteProject(id)

    return NextResponse.json(
        { message: `Project ${success ? "deleted successfully" : "deletion failed"}` },
        { status: success ? 200 : 400 }
    )
})