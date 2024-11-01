import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useRouter} from "next/router";

import { toast } from "sonner";

import { SignUpForm } from "@/types/index";
import { Api } from "@/lib/utils";

const createUser = async (input: SignUpForm) => {
    const router = useRouter();
    try {
        const response = await Api.post("/create_user", input);
        toast.success("User created successfully");
        router.push("/log-in");
        return response.data;
    } catch (error: unknown) {
        toast.error("Error creating user");

        throw new Error("Error creating user");
    }
};

export default function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
    });
}

