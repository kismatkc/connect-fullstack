import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignInForm } from "@/types/index";
import { Api } from "@/lib/axios-utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const getProfileDetails = async (input: SignInForm) => {
  try {
    const response = await Api.get("/profile_details", input);
    return response.data;
  } catch (error: unknown) {
    throw new Error("Error getting details");
  }
};

export default function useVerifyUser() {
  const router = useRouter();
  return useMutation({
    mutationFn: getProfileDetails,
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
