import { withErrorHandler } from "@/lib/asyncHandler";
import { reorderProjects } from "@/lib/services/projects";
import { validateBody } from "@/lib/validate";
import { reorderSchema } from "@/lib/validators/common";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(async (req: NextRequest) => {
    const body = await req.json();
    const payload = validateBody(reorderSchema, body);

    await reorderProjects(payload)

    return NextResponse.json({ message: "Project reordered successfully" }, { status: 200 })
})