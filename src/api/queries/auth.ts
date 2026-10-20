import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { LoginPayload } from "@/lib/validators/login";

import { auth } from "../endpoints";
import { queryKeys } from "./queryKeys";
import { useRouter } from "next/navigation";


export const useSession = () => {
    return useQuery({
        queryKey: queryKeys.profile,

        queryFn: async () => {
            const response = await auth.getAdmin();

            return response.data;
        },
    });
};


export const useLoginMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: LoginPayload) => auth.login(data),

        onSuccess: async (response) => {
            toast.success(response.message);

            await queryClient.invalidateQueries({
                queryKey: queryKeys.profile,
            });
            router.push("/");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => auth.logout(),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.removeQueries({
                queryKey: queryKeys.profile,
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
};