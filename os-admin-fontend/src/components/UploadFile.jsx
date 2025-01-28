import React, { useState } from "react";
import { useFileUpload } from "../hooks/useUploadApi";
import { UploadPreview } from "./UploadPreview";

export const UploadFile = ({ setValue, uploadData, setUploadData }) => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const { mutate: uploadImage, isLoading: isImageUploading } = useFileUpload(
    (response) => {
      console.log(response.data.filename);
      const imageUrl = response.data?.filename;
      setUploadData({
        imageUrl: SERVER_URL + response.data.filename,
        imageInfo: `${response.data.filename} (${response.data.mimetype})`,
      });

      setValue("upload_img", imageUrl);
    }
  );

  const handleFileUpload = (files) => {
    uploadImage(files[0]); // Trigger file upload mutation
  };

  const cancelUploadImage = () => {
    setUploadData({ imageUrl: null, imageInfo: null });
    setValue("upload_img", null);
  };
  return (
    <>
      {!uploadData.imageUrl && (
        <div className="mb-3">
          <input
            type="file"
            name="image"
            className="form-control form-control-sm"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            disabled={uploadImage.isLoading}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}

      {isImageUploading && <p>Uploading file...</p>}
      {uploadData.imageUrl && (
        <UploadPreview
          uploadedImageUrl={uploadData.imageUrl}
          uploadImageInfo={uploadData.imageInfo}
          cancelUploadAction={cancelUploadImage}
        />
      )}
    </>
  );
};
