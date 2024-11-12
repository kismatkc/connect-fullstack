import { Storage } from "@google-cloud/storage";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log(formData.get("imageName"), formData.get("fileType"));
    const imageName = formData.get("imageName");
    const fileType = formData.get("fileType");

    if (!process.env.CLIENT_SECRETKEY)
      throw new Error("please provide secret key");
    const storage = new Storage({
      projectId: process.env.GOOGLECLOUD_PROJECTID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.CLIENT_SECRETKEY.replace(/\\n/g, "\n"),
      },
    });

    const bucketName = process.env.NEXT_PUBLIC_PROFILE_BUCKET_NAME;

    if (!bucketName) throw new Error("please provide bucket  name");
    const bucket = storage.bucket(bucketName);
    const fileName = `${Date.now()}-${imageName}`;
    const file = bucket.file(fileName);
    //if want to set cors
    // await storage.bucket(bucketName).setCorsConfiguration([
    //   {
    //     maxAgeSeconds: 3600,
    //     method: ["GET", "PUT", "POST"],
    //     origin: ["*"],
    //     responseHeader: ["Content-Type"],
    //   },
    // ]);

    const [signedUrl] = await file.getSignedUrl({
      action: "write",
      version: "v4",
      expires: Date.now() + 60 * 1000 * 15,
      contentType: fileType as string,
    });

    return NextResponse.json({ success: true, signedUrl, fileName });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Unable to retrieve the signed url ",
    });
  }
}
