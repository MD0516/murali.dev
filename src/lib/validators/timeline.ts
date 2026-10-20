import { z } from "zod";

export const createTimelineSchema = z.object({
    title: z.string().min(1, "Title is required"),
    institution: z.string().min(1, "Institution is required"),
    description: z.string().optional(),
    type: z.enum(["edu", "work"]),
    status: z.enum(["completed", "ongoing", "current"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
});

export const updateTimelineSchema = createTimelineSchema.partial();

export type CreateTimelinePayload = z.infer<typeof createTimelineSchema>;
export type UpdateTimelinePayload = z.infer<typeof updateTimelineSchema>;