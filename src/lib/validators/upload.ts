import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/jpg", "application/pdf"] as const;

export const uploadFileSchema = z.object({
  files: z.array(
    z.instanceof(File)
      .refine((file) => ALLOWED_TYPES.includes(file.type as typeof ALLOWED_TYPES[number]), {
        message: "Only PNG, JPEG, WebP and PDF files are allowed",
      })
      .refine((file) => file.size <= MAX_SIZE, {
        message: "File must be under 5MB",
      })
  ).min(1, "At least one file required"),
});

export const uploadQuerySchema = z.object({
  type: z.enum(["image", "resume"]).default("image"),
});
