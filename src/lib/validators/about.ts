import { z } from "zod";

export const createAboutSchema = z.object({
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(1, "Info is required"),
  tagline: z.string().min(1, "Tagline is required"),
});

export const updateAboutSchema = createAboutSchema.partial();

export type CreateAboutPayload = z.infer<typeof createAboutSchema>;
export type UpdateAboutPayload = z.infer<typeof updateAboutSchema>;