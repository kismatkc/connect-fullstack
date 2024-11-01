import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignInForm } from "@/types/index";
import { Api } from "@/lib/utils";

const verifyUser = async (input: SignInForm) => {
    try {
        const response = await Api.post("/verify_user", input);
        
        return response.data;
    } catch (error: unknown) {
        toast.error("Error verifying user");

        throw new Error("Error verifying user");
    }
};

export default function useVerifyUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyUser,
    });
}

