import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { IncomingMessage } from "http";
import { IncomingForm } from "formidable"; // Import IncomingForm directly
const storage = new Storage({
  projectId: process.env.GOOGLECLOUD_PROJECTID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    client_secret: process.env.CLIENT_SECRETKEY,
  },
});

const bucketName = process.env.BUCKET_NAME;
if (!bucketName) throw new Error("Please provide bucket name");

export const config = {
  api: {
    bodyParser: false,
  },
};
const bucket = storage.bucket(bucketName);
export async function POST(req: NextRequest) {
  try {
    console.log("fired");

    const form = new IncomingForm();
    form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
      if (err) {
        console.error("Error parsing the files:", err);
        return NextResponse.json(
          { message: "Failed to parse files" },
          { status: 500 }
        );
      }
      const firstName = fields.firstName; // Accessing fields
      const file = files.file; // Accessing uploaded file

      console.log("First Name:", firstName);
      console.log("File:", file);

      // Logic to handle the file (e.g., upload to cloud storage)

      return NextResponse.json({ message: "Profile uploaded successfully" });
    });
  } catch (error) {
    console.log(error);
  }
}
