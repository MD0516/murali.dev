import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { upload } from "../endpoints";


export const useUploadImageMutation = () => {
    const taskId = new Date().getTime().toString() + crypto.randomUUID().toString();
    return useMutation({
        mutationFn: async ({
            file,
        }: {
            file: File;
        }) => {
            const response = await upload.image(file);

            return response.data;
        },

        onMutate() {
            toast.loading("Uploading image...", { id: taskId });
        },

        onSuccess: () => {
            toast.success("Image uploaded successfully", { id: taskId });
        },

        onError: (error) => {
            toast.error(error.message, { id: taskId });
        },
    });
};