import z from "zod";
import { ValidationError } from "./errors";

export function validateBody<T extends z.ZodSchema>(schema: T, data: unknown): z.infer<T> {
    const result = schema.safeParse(data)
    if (!result.success) {
        throw new ValidationError("Invalid request body", result.error.flatten)
    }
    
    return result.data;
}