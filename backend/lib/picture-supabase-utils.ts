import { supabase } from "./database.ts";
import { getAfterKeywordText } from "./utils.ts";
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
export const deletePictures = async (url: string) => {
  try {
    const bucketName = "posts_pictures";
    const sizes = ["small", "medium", "large"];
    const filePath = sizes.map((size) => {
      const baseName = getAfterKeywordText(url, `${bucketName}/`);
      const fileName = `${size}-${baseName}`;
      return fileName;
    });

    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove(filePath);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
