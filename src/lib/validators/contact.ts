import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.email("Invalid email address"),
    message: z.string().min(10, "Message is too short").max(2000),
});

export type ContactPayload = z.infer<typeof contactSchema>