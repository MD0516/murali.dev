import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/jpg"] as const;

export const uploadImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => ALLOWED_TYPES.includes(file.type as typeof ALLOWED_TYPES[number]), {
      message: "Only PNG, JPEG, and WebP images are allowed",
    })
    .refine((file) => file.size <= MAX_SIZE, {
      message: "Image must be under 5MB",
    }),
});
