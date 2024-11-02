import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignInForm } from "@/types/index";
import { Api } from "@/lib/utils";
import { useRouter } from "next/navigation";

const verifyUser = async (input: SignInForm) => {
    try {
        const response = await Api.post("/verify_user", input);
        
        return response.data;
        
    } catch (error: unknown) {

        throw new Error("Error verifying credentials");
    }
};

export default function useVerifyUser() {
    const queryClient = useQueryClient();
const router =  useRouter()
    return useMutation({
        mutationFn: verifyUser,
        onSuccess: ()=>{
            router.push("/")
        },onError:()=>{
            toast.error("Error verifying credentials");

        }
    });
}

