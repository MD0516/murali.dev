import { z } from "zod";

export const reorderSchema = z.object({
    order: z
        .array(
            z.object({
                id: z.string().min(1, "ID is required"),
                order: z.number().int(),
            })
        )
        .min(1, "At least one item is required"),
});

export type ReorderPayload = z.infer<typeof reorderSchema>;