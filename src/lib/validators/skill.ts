import { z } from "zod";

export const createSkillSchema = z.object({
  category: z.string().min(1, "Category is required"),
  skills: z.array(z.string().min(1, "Skill cannot be empty")).min(1, "At least one skill is required"),
});

export const updateSkillSchema = createSkillSchema.partial();

export type CreateSkillPayload = z.infer<typeof createSkillSchema>;
export type UpdateSkillPayload = z.infer<typeof updateSkillSchema>;