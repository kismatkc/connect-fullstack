import { supabase } from "./database.ts";
export const uploadPicture = async (
    fileName: string,
    buffer: Buffer
) => {
    try {
        const bucketName = "posts_pictures";

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, buffer, {
                upsert: true,
                contentType: "image/*"
            });
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
    }
};
