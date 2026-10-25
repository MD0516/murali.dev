import { withErrorHandler } from "@/lib/asyncHandler";
import { run } from "@/scripts/seed";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  await run();

  return NextResponse.json(
    { message: "Seed complete" },
    { status: 200 }
  );
});