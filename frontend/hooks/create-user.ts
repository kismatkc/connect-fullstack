import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { SignUpForm } from "@/types/index";
import { Api } from "@/lib/axios-utils";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

async function saveProfile(file: File) {
  try {
    const bucketName = process.env.NEXT_PUBLIC_PROFILE_BUCKET_NAME;
    const fileName: string = `${Date.now()}-${file.name}`;

    if (!bucketName) throw new Error("Please provide bucket name");
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, { upsert: true });

    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return {
      url: publicUrl,
    };
  } catch (error) {
    console.log(error);

    return { message: "fail to retrieve url " };
  }
}

const createUser = async (input: SignUpForm) => {
  try {
    const { url } = await saveProfile(input.avatarUrl as File);
    const user = { ...input, avatarUrl: url };
    const response = await Api.post("/create_user", user);
    return response.data;
  } catch (error) {
    throw new Error("Error creating Account");
  }
};

export default function useCreateUser() {
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
