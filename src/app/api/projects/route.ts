import { withErrorHandler } from "@/lib/asyncHandler";
import { createProject, getProjects } from "@/lib/services/projects";
import { validateBody } from "@/lib/validate";
import { createProjectSchema } from "@/lib/validators/project";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    const data = await getProjects();

    return NextResponse.json({ message: "Projects fetched successfully", data }, { status: 200 })
})

export const POST = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const payload = validateBody(createProjectSchema, body);
    
    const data = await createProject(payload)
    
    return NextResponse.json({ message: "Project created successfully", data }, { status: 201 })
})

