import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    CreateProjectPayload,
    UpdateProjectPayload,
} from "@/lib/validators/project";

import { ReorderPayload } from "@/lib/validators/common";

import { project } from "../endpoints";
import { queryKeys } from "./queryKeys";


export const useProjectsQuery = () => {
    return useQuery({
        queryKey: queryKeys.projects,

        queryFn: async () => {
            const response = await project.getAll();

            return response.data;
        },
    });
};


export const useCreateProjectMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: CreateProjectPayload;
        }) => project.create(data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.projects,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUpdateProjectMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateProjectPayload;
        }) => project.update(id, data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.projects,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
        }: {
            id: string;
        }) => project.delete(id),

        onMutate: () => {
            const toastId = toast.loading("Deleting project...");
            return { toastId };
        },

        onSuccess: (response, _variables, context) => {
            toast.success(response.message ?? "Project deleted successfully", {
                id: context?.toastId,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.projects,
            });
        },

        onError: (error, _variables, context) => {
            toast.error(error.message || "Failed to delete project", {
                id: context?.toastId,
            });
        },
    });
};


export const useReorderProjectsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: ReorderPayload;
        }) => project.reorder(data),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: queryKeys.projects,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};