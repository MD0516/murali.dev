import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  techStack: z.array(z.string()).default([]),
  images: z.array(
    z.object({
      src: z.string().min(1, "Image source is required"),
      alt: z.string().min(1, "Image alt text is required"),
    })
  ),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
export type UpdateProjectPayload = z.infer<typeof updateProjectSchema>;

export const deleteImageSchema = z.object({
  imageUrl: z.string().min(1, "Project Id is required"),
})

export type DeleteImagePayload = z.infer<typeof deleteImageSchema>