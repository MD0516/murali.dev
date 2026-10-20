import { NextResponse } from "next/server";

export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.name = "AppError";
    }
}

export class ValidationError extends AppError {
    constructor(message: string, public issues: unknown) {
        super(message, 400);
        this.name = "ValidationError";
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
        this.name = "UnauthorizedError";
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Not found") {
        super(message, 404);
        this.name = "NotFoundError";
    }
}

export function handleApiError(error: unknown) {
    if (error instanceof ValidationError) {
        return NextResponse.json(
            { error: error.message, issues: error.issues },
            { status: error.statusCode }
        )
    }

    if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }

    console.error("Unexpected error occurred: ", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}