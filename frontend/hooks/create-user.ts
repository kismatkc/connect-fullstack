import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignUpForm } from "@/types/index";
import { Api } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

async function saveProfile(file: File) {
  try {
    const formData = new FormData();
    formData.append("imageName", file.name);
    formData.append("fileType", file.type);

    const response = await axios.post("/api/getProfileSignedUrl", formData);
    const url: { success: boolean; signedUrl: string } = response.data;

    const upload = await axios.put(url.signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return {
      url: `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_PROFILE_BUCKET_NAME}/${file.name}`,
    };
  } catch (error) {
    console.log(error);

    return { message: "fail to retrieve url " };
  }
}

const createUser = async (input: SignUpForm) => {
  try {
    const { url } = await saveProfile(input.avatarUrl);
    const user = { ...input, avatarUrl: url };
    const response = await Api.post("/create_user", user);
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
