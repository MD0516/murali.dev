import { del, put, PutBlobResult } from "@vercel/blob"
import { requireAdmin } from "../auth";
import { AppError } from "../errors";

export const uploadFiles = async (files: File[], type: 'image' | 'resume'): Promise<string[]> => {
    await requireAdmin();

    const folder = type === "image" ? "images" : "resume";

    const results: PromiseSettledResult<PutBlobResult>[] = await Promise.allSettled(
        files.map((f) =>
            put(`${folder}/${f.name}`, f, {
                access: 'public',
                contentType: f.type,
                addRandomSuffix: true,
            })
        )
    )

    const urls = results.flatMap((r) => (r.status === "fulfilled" ? [r.value.url] : []));

    if (urls.length !== files.length) {
        if (urls.length > 0) await del(urls).catch((error) => {
            console.error("Failed to clean up partially uploaded files:", error);
        });
        throw new AppError("Upload failed for some files. Please try again.", 500);
    }

    return urls;
};