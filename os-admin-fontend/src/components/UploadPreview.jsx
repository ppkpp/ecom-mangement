import { FaTrash } from "react-icons/fa";

export const UploadPreview = ({
  uploadedImageUrl,
  uploadImageInfo,
  cancelUploadAction,
}) => {
  return (
    <div className="dropzone-previews mt-3" id="file-previews">
      <div className="card mt-1 mb-0 shadow-none border dz-processing dz-error dz-complete dz-image-preview">
        <div className="p-2">
          <div className="row align-items-center">
            <div className="col-auto">
              <img src={uploadedImageUrl} alt="" height="48" />
            </div>
            <div className="col ps-0">
              <a className="text-muted fw-bold" data-dz-name="">
                {" "}
                {uploadImageInfo}
              </a>
            </div>
            <div className="col-auto">
              <a
                className="btn btn-link btn-lg text-muted"
                data-dz-remove=""
                onClick={cancelUploadAction}
              >
                <FaTrash />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
