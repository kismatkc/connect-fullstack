import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignInForm } from "@/types/index";
import { Api } from "@/lib/axios-utils";
import { signIn } from "next-auth/react";
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
  const router = useRouter();

  return useMutation({
    mutationFn: verifyUser,
    onSuccess: async (user, variables) => {
      const resposne = await signIn("credentials", {
        ...user.data,

        redirect: false,
      });

      router.push("/");
    },
    onError: () => {
      toast.error("Error verifying credentials");
    },
  });
}
