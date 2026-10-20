import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { upload } from "../endpoints";


export const useUploadImageMutation = () => {
    return useMutation({
        mutationFn: async ({
            file,
        }: {
            file: File;
        }) => {
            const response = await upload.image(file);

            return response.data;
        },

        onSuccess: () => {
            toast.success("Image uploaded successfully");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};