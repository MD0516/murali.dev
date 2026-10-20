import { put } from "@vercel/blob"
import { requireAdmin } from "../auth";

export const uploadImage = async (file: File): Promise<string> => {
    await requireAdmin();
    
    const { url } = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
    });

    return url;
};