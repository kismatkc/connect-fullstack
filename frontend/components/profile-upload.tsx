"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface FileWithPreview extends File {
  preview?: string;
}

const ImageUpload = ({
  onProfileChange,
  onPostPictureChange,
}: {
  onProfileChange?: (value: File) => void;
  onPostPictureChange?: (picture: File | null) => void;
}) => {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setFile(Object.assign(selectedFile, { preview: previewUrl }));
        if (onProfileChange) {
          onProfileChange(selectedFile);
        }
        if (onPostPictureChange) {
          onPostPictureChange(selectedFile);
        }
      }
    } catch (error) {
      console.log(error);
    }
    //eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
    minSize: 0,
  });

  React.useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className="relative rounded-lg overflow-hidden"
        style={{ height: file ? "350px" : "180px", position: "relative" }}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="relative w-full h-full">
            <Image
              src={file.preview || ""}
              alt="Preview"
              fill
              className="object-cover rounded-lg "
            />
          </div>
        ) : (
          <div className="space-y-2 h-full flex flex-col items-center justify-center">
            <p className="text-lg text-gray-600 flex flex-row gap-x-1 flex-nowrap">
              <Image
                src="/header/photo-video.png"
                className="size-6"
                width={24}
                height={24}
                alt="phot-video icon"
              />
              {isDragActive
                ? "Drop your image here"
                : "Drag & drop an image here"}
            </p>
            <p className="text-sm text-gray-500">
              or click to select (max 4MB)
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex justify-center mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              if (onPostPictureChange) {
                onPostPictureChange(null);
              }
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-md"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
