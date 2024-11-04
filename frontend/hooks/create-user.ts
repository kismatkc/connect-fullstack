import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignUpForm } from "@/types/index";
import { Api } from "@/lib/utils";
import { useRouter } from "next/navigation";

const createUser = async (input: SignUpForm) => {
  try {
    const response = await Api.post("/create_user", input);
    return response.data;
  } catch (error) {
    throw new Error("Error creating Account");
  }
};

export default function useCreateUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/log-in");
    },
    onError: () => {
      toast.error("Error creating Account");
    },
  });
}
