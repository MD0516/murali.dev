import { withErrorHandler } from "@/lib/asyncHandler";
import { getAdmin } from "@/lib/services/auth";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    const data = await getAdmin()

    return NextResponse.json({ message: "Admin details fetched", data }, { status: 200 })
})