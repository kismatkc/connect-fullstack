import { supabase } from "./database.ts";
export const uploadPicture = async (
  fileNameWithSize: string,
  buffer: Buffer,
  fileNameWithoutSize: string
) => {
  try {
    const bucketName = "posts_pictures";
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileNameWithSize, buffer, {
        upsert: true,
        contentType: "image/*",
      });
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(fileNameWithoutSize); //the size is is th eonly modifier for the link so its better to append the size isntead of making additional cloumns in table
    return publicUrl;
  } catch (error) {
    console.log(error);
  }
};
