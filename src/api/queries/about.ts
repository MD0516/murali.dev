import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { UpdateAboutPayload } from "@/lib/validators/about";

import { about } from "../endpoints";
import { queryKeys } from "./queryKeys";


export const useAboutQuery = () => {
    return useQuery({
        queryKey: queryKeys.about,

        queryFn: async () => {
            const response = await about.get();

            return response.data;
        },
    });
};


export const useUpdateAboutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: UpdateAboutPayload;
        }) => about.update(data),

        onMutate: () => {
            const toastId = toast.loading("Updating about...");
            return { toastId };
        },

        onSuccess: (response, _variables, context) => {
            toast.success(response.message ?? "About updated successfully", {
                id: context?.toastId,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.about,
            });
        },

        onError: (error, _variables, context) => {
            toast.error(error.message || "Failed to update about", {
                id: context?.toastId,
            });
        },
    });
};