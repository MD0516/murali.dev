import { put } from "@vercel/blob"
import { requireAdmin } from "../auth";

export const uploadImage = async (file: File, type: 'image' | 'resume'): Promise<string> => {
    await requireAdmin();

    const fileName = type === 'resume' ? `resume/${file.name}` : `images/${file.name}`;
    const { url } = await put(fileName, file, {
        access: "public",
        addRandomSuffix: true,
    });

    return url;
};