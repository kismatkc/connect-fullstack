import { useMutation } from "@tanstack/react-query";
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

export default function useSaveProfile() {
  return useMutation({
    mutationFn: saveProfile,
  });
}
