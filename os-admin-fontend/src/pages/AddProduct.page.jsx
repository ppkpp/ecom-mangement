import React, { useState } from "react";
import { FaPenAlt, FaSave } from "react-icons/fa";
import { UploadPreview } from "../components/UploadPreview";
import { useFileUpload } from "../hooks/useUploadApi";
import { useForm } from "react-hook-form";
import { useCategoryList } from "../hooks/useCategoryApi";
import { useAddProduct, useUpdateProduct } from "../hooks/useProductApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { UploadFile } from "../components/UploadFile";

export const AddProductPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [uploadData, setUploadData] = useState({
    imageUrl: null,
    imageInfo: null,
  });
  const { id } = useParams();
  const isEdit = id ? true : false;
  const { mutate: addProduct } = useAddProduct(() => {
    reset();
    setUploadData({ imageUrl: null, imageInfo: null });
    toast("Product created");
  });
  const form = useForm({
    defaultValues: async () => {
      if (isEdit) {
        const response = await getProductById(id);
        const data = response.data;
        const imageUrl = data?.upload_img;

        setUploadData({
          imageUrl: SERVER_URL + imageUrl,
          imageInfo: imageUrl,
        });
        return {
          name: data.name,
          categoryId: data.category.id,
          price: data.price,
          stock: data.stock,
          description: data.description,
          upload_img: data.upload_img,
          active: data.active,
        };
      }
      return {};
    },
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;

  const { mutate: updateProduct } = useUpdateProduct((data) => {
    navigate("/product");
  });
  const onSubmit = async (formdata) => {
    isEdit ? updateProduct({ id, ...formdata }) : addProduct(formdata);
    console.log(formdata);
  };

  const [categories, setCategories] = useState([]);
  const { isLoading, data, isError, error, refetch } = useCategoryList(
    (response) => {
      setCategories(response.data);
    }
  );
  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center bg-light">
            <h5
              className="m-0 title"
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              {isEdit ? "Edit" : "Add New Product"}
            </h5>
            {/* <button className="btn btn-outline-secondary btn-sm">
              <i className="fas fa-info-circle"></i> Help
            </button> */}
          </div>
          <div className="card-body">
            <form id="productForm" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.name && "is-invalid"
                  }`}
                  id="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Product name is required.",
                    },
                  })}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className={`form-select ${errors.categoryId && "is-invalid"}`}
                  id="category"
                  name="category"
                  {...register("categoryId", {
                    required: {
                      value: true,
                      message: "Category is required.",
                    },
                    valueAsNumber: true,
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : isError ? (
                    <option>{error}</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                <div className="invalid-feedback">
                  {" "}
                  {errors.categoryId?.message}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className={`form-control form-control-sm  ${
                    errors.price && "is-invalid"
                  }`}
                  id="price"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Product name is required.",
                    },
                    valueAsNumber: true,
                    min: { value: 1, message: "Price must be at least 1." },
                  })}
                />
                <div className="invalid-feedback"> {errors.price?.message}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  className={`form-control form-control-sm  ${
                    errors.stock && "is-invalid"
                  }`}
                  id="stock"
                  {...register("stock", {
                    required: {
                      value: true,
                      message: "Product name is required.",
                    },
                    valueAsNumber: true,
                    min: { value: 1, message: "Price must be at least 1." },
                  })}
                />
                <div className="invalid-feedback"> {errors.stock?.message}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description (Optional)
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  {...register("description")}
                ></textarea>
              </div>

              <input type="hidden" name="image" {...register("upload_img")} />

              {/*Image Upload */}

              <UploadFile
                setValue={setValue}
                uploadData={uploadData}
                setUploadData={setUploadData}
              />

              <div className="mb-3 form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="active"
                  {...register("active")}
                  defaultChecked={true}
                />
                <label className="form-check-label" htmlFor="active">
                  Active
                </label>
              </div>

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
