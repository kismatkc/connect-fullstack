import { useMutation } from "@tanstack/react-query";

async function saveProfile({
  firstName,
  file,
}: {
  firstName: string;
  file: File;
}) {
  try {
    return { message: "success" };
  } catch (error) {
    return { message: "fail" };
  }
}

export default function useSaveProfile() {
  return useMutation({
    mutationFn: saveProfile,
  });
}
