import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { upload } from "../endpoints";


export const useUploadFileMutation = () => {
    return useMutation({
        mutationFn: async ({
            file,
            type,
        }: {
            file: File;
            type: "image" | "resume";
        }) => {
            const response = await upload.file(file, type);
            return response.data;
        },

        onMutate: ({ type }) => {
            const toastId = toast.loading(`Uploading ${type}...`);
            return { toastId };
        },

        onSuccess: (_data, { type }, context) => {
            toast.success(
                `${type === "image" ? "Image" : "Resume"} uploaded successfully`,
                { id: context?.toastId }
            );
        },

        onError: (error, _variables, context) => {
            toast.error(error.message, { id: context?.toastId });
        },
    });
};