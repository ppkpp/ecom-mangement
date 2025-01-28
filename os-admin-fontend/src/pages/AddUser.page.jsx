import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddUser } from "../hooks/useUserApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UploadFile } from "../components/UploadFile";
import { FaPenAlt, FaSave } from "react-icons/fa";
import { getUserById } from "../api/UserApi";

export const AddUserPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [uploadData, setUploadData] = useState({
    imageUrl: null,
    imageInfo: null,
  });
  const { id } = useParams();
  const isEdit = id ? true : false;

  const { mutate: addUser } = useAddUser(() => {
    reset();
    setUploadData({ imageUrl: null, imageInfo: null });
    toast("User created");
  });
  const form = useForm({
    defaultValues: async () => {
      if (isEdit) {
        const response = await getUserById(id);
        const data = response.data;
        const imageUrl = data?.upload_img;
        setUploadData({
          imageUrl: SERVER_URL + imageUrl,
          imageInfo: imageUrl,
        });
        return {
          username: data.username,
          password: "",
          role: data.role,
          phoneno: data.phoneno,
          email: data.email,
          active: data.active,
        };
      }
      return {
        username: "",
        password: "",
        role: "admin",
        phoneno: "",
        email: "",
        active: true,
      };
    },
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;

  const onSubmit = async (formdata) => addUser(formdata);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center bg-light">
            <h5 className="m-0">
              <span className="title">Add User</span>
            </h5>
          </div>
          <div className="card-body">
            <form id="userForm" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.username && "is-invalid"
                  }`}
                  id="username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required.",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control form-control-sm ${
                    errors.username && "is-invalid"
                  }`}
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required.",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Select Role
                </label>
                <select
                  id="role"
                  className={`form-select ${errors.role ? "is-invalid" : ""}`}
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Role is required.",
                    },
                  })}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>

                {/* Error Message */}
                {errors.role && (
                  <div className="text-danger">{errors.role.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="phoneno" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className={`form-control form-control-sm ${
                    errors.phoneno && "is-invalid"
                  }`}
                  id="phone"
                  {...register("phoneno", {
                    required: {
                      value: true,
                      message: "Phoneno is required.",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.phoneno?.message}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control form-control-sm ${
                    errors.email && "is-invalid"
                  }`}
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required.",
                    },
                  })}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="active"
                  className="form-check-input"
                  {...register("active")}
                  defaultChecked={true}
                />
                <label htmlFor="active" className="form-check-label">
                  Active
                </label>
              </div>

              <div className="mb-3">
                <UploadFile
                  setValue={setValue}
                  uploadData={uploadData}
                  setUploadData={setUploadData}
                />
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
