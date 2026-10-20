import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    CreateTimelinePayload,
    UpdateTimelinePayload,
} from "@/lib/validators/timeline";

import { ReorderPayload } from "@/lib/validators/common";

import { timeline } from "../endpoints";
import { queryKeys } from "./queryKeys";


export const useTimelineQuery = () => {
    return useQuery({
        queryKey: queryKeys.timeline,

        queryFn: async () => {
            const response = await timeline.getAll();

            return response.data;
        },
    });
};


export const useCreateTimelineMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: CreateTimelinePayload;
        }) => timeline.create(data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.timeline,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUpdateTimelineMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateTimelinePayload;
        }) => timeline.update(id, data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.timeline,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useDeleteTimelineMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
        }: {
            id: string;
        }) => timeline.delete(id),

        onMutate: () => {
            const toastId = toast.loading("Deleting timeline...");
            return { toastId };
        },

        onSuccess: (response, _variables, context) => {
            toast.success(response.message ?? "Timeline deleted successfully", {
                id: context?.toastId,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.timeline,
            });
        },

        onError: (error, _variables, context) => {
            toast.error(error.message || "Failed to delete timeline", {
                id: context?.toastId,
            });
        },
    });
};

export const useReorderTimelineMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: ReorderPayload;
        }) => timeline.reorder(data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.timeline,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};