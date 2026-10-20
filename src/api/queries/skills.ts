import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    CreateSkillPayload,
    UpdateSkillPayload,
} from "@/lib/validators/skill";

import { ReorderPayload } from "@/lib/validators/common";

import { skill } from "../endpoints";
import { queryKeys } from "./queryKeys";
import { Skill } from "@/types";


export const useSkillsQuery = () => {
    return useQuery<Skill[]>({
        queryKey: queryKeys.skills,

        queryFn: async () => {
            const response = await skill.getAll();

            return response.data;
        },
    });
};


export const useCreateSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: CreateSkillPayload;
        }) => skill.create(data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.skills,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUpdateSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateSkillPayload;
        }) => skill.update(id, data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.skills,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useDeleteSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
        }: {
            id: string;
        }) => skill.delete(id),

        onMutate: () => {
            const toastId = toast.loading("Deleting skill...");
            return { toastId };
        },

        onSuccess: (response, _variables, context) => {
            toast.success(response.message ?? "Skill deleted successfully", {
                id: context?.toastId,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.skills,
            });
        },

        onError: (error, _variables, context) => {
            toast.error(error.message || "Failed to delete skill", {
                id: context?.toastId,
            });
        },
    });
};


export const useReorderSkillsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: ReorderPayload;
        }) => skill.reorder(data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.skills,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};