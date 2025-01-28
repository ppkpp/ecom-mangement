import React, { useState } from "react";
import { UploadFile } from "../components/UploadFile";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getBannerById, updateBanner } from "../api/BannerApi";
import { useAddBanner, useUpdateBanner } from "../hooks/useBannerApi";
import { FaPenAlt, FaSave } from "react-icons/fa";

export const AddBannerPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [uploadData, setUploadData] = useState({
    imageUrl: null,
    imageInfo: null,
  });

  const { id } = useParams();
  const isEdit = id ? true : false;
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: async () => {
      if (isEdit) {
        const response = await getBannerById(id);
        const data = response.data;
        const imageUrl = data?.upload_img;
        setUploadData({ imageUrl: SERVER_URL + imageUrl, imageInfo: imageUrl });

        return {
          name: data.name,
          upload_img: data.upload_img,
        };
      }
      return {};
    },
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;

  //hooks
  const { mutate: addBanner } = useAddBanner((data) => {
    reset();
    setUploadData({ imageUrl: null, imageInfo: null });
    toast("Banner created");
  });

  const { mutate: updateBanner } = useUpdateBanner((data) => {
    navigate("/banner");
  });
  const onSubmit = (formdata) => {
    isEdit ? updateBanner({ id, ...formdata }) : addBanner(formdata);
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center bg-light">
            <h5
              className="m-0 title"
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              Create Banner
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.name && "is-invalid"
                  }`}
                  placeholder="Enter Title"
                  style={{
                    fontSize: "0.875rem",
                    padding: "8px 10px",
                    borderRadius: "8px",
                  }}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Banner title is required.",
                    },
                  })}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
              <div className="mb-3">
                <input type="hidden" name="image" {...register("upload_img")} />
                <UploadFile
                  setValue={setValue}
                  uploadData={uploadData}
                  setUploadData={setUploadData}
                />
              </div>
              {/* Submit Button */}
              <div className="mb-3 text-end mt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                    borderRadius: "8px",
                  }}
                >
                  {isEdit ? (
                    <>
                      <FaPenAlt className="me-2" />
                      Update
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
