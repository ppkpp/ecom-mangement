import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPen, FaPenAlt, FaSave } from "react-icons/fa";
import { useAddCategory, useUpdateCategory } from "../hooks/useCategoryApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../api/categoryApi";

import { UploadFile } from "../components/UploadFile";
export const AddCategoryPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [uploadData, setUploadData] = useState({
    imageUrl: null,
    imageInfo: null,
  });

  //for edit
  const { id } = useParams();
  const isEdit = id ? true : false;
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: async () => {
      if (isEdit) {
        const response = await getCategoryById(id);
        const data = response.data;
        const imageUrl = data?.upload_img;
        setUploadData({ imageUrl: SERVER_URL + imageUrl, imageInfo: imageUrl });
        return {
          name: data.name,
          description: data.description,
          upload_img: data.upload_img,
        };
      }
      return {};
    },
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  //hooks
  const { mutate: addCategory } = useAddCategory((data) => {
    reset();
    setUploadData({ imageUrl: null, imageInfo: null });
    toast("Category created");
  });
  const { mutate: updateCategory } = useUpdateCategory((data) => {
    navigate("/category");
  });
  //Actions
  const onSubmit = async (formdata) => {
    isEdit ? updateCategory({ id, ...formdata }) : addCategory(formdata);
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
              Create Category
            </h5>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="fas fa-info-circle"></i> Help
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Category Name */}
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label"
                  style={{ fontWeight: "500" }}
                >
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  className={`form-control form-control-sm ${
                    errors.name && "is-invalid"
                  }`}
                  required
                  style={{
                    fontSize: "0.875rem",
                    padding: "8px 10px",
                    borderRadius: "8px",
                  }}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Category name is required.",
                    },
                  })}
                />

                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label"
                  style={{ fontWeight: "500" }}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  className={`form-control form-control-sm ${
                    errors.description && "is-invalid"
                  }`}
                  id="description"
                  rows="3"
                  placeholder="Enter Category Description"
                  required
                  style={{
                    fontSize: "0.875rem",
                    padding: "8px 10px",
                    borderRadius: "8px",
                  }}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                ></textarea>
                <div className="invalid-feedback">
                  {errors.description?.message}
                </div>
              </div>

              <input type="hidden" name="image" {...register("upload_img")} />

              {/* Image Upload */}

              <UploadFile
                setValue={setValue}
                uploadData={uploadData}
                setUploadData={setUploadData}
              />

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
                      <FaPenAlt className="me-2" />Update
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" />Save
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
