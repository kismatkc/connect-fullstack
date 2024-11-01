import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignUpForm } from "@/types/index";
import { Api } from "@/lib/utils";

const createUser = async (input: SignUpForm) => {
    try {
        const response = await Api.post("/create_user", input);
        toast.success("User created successfully");
        return response.data;
    } catch (error: unknown) {
        toast.error("Error creating user");

        throw new Error("Error creating user");
    }
};

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
    });
}

