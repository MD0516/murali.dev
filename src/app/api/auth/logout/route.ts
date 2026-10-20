import { withErrorHandler } from "@/lib/asyncHandler";
import { destroySession, requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    await requireAdmin()
    await destroySession()
    return NextResponse.json({ message: "Logout success" }, { status: 200 })
})