"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface FileWithPreview extends File {
  preview?: string;
}

const ImageUpload = ({
  onValueChange,
}: {
  onValueChange: (value: File) => void;
}) => {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        // Create preview URL
        const previewUrl = URL.createObjectURL(selectedFile);
        setFile(Object.assign(selectedFile, { preview: previewUrl }));
        const formData = new FormData();
        formData.append("firstName", "kismat");
        formData.append("file", selectedFile);
        const resposne = await fetch("/api/uploadProfile", {
          method: "POST",

          body: formData,
        });
        onValueChange(selectedFile);
      }
    },
    [onValueChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
  });

  // Cleanup preview URL on unmount
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
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="space-y-4">
            <div className="relative w-40 h-40 mx-auto rounded-lg overflow-hidden">
              <Image
                src={file.preview || ""}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-500">
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📸</div>
            <p className="text-lg text-gray-600">
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

      {/* Optional error messages */}
      <div className="mt-2">{/* Add your error handling here */}</div>
    </div>
  );
};

export default ImageUpload;
