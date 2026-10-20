import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ContactPayload } from "@/lib/validators/contact";

import { contact } from "../endpoints";

export const useContactMutation = () => {
    return useMutation({
        mutationFn: async ({ data }: { data: ContactPayload }) =>
            contact.send(data),

        onMutate: () => {
            const toastId = toast.loading("Sending message...");
            return { toastId };
        },

        onSuccess: (response, _variables, context) => {
            const toastId = context?.toastId;

            if (response.success) {
                toast.success(response.message ?? "Message sent", {
                    id: toastId,
                });
                return;
            }

            toast.error(response.message ?? "Something went wrong", {
                id: toastId,
            });
        },

        onError: (error, _variables, context) => {
            toast.error(error.message || "Failed to send message", {
                id: context?.toastId,
            });
        },
    });
};