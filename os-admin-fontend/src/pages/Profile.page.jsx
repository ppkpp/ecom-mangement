import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaSpinner } from "react-icons/fa";
import { useMyProfile } from "../hooks/useProfileApi";
import { getMyProfile } from "../api/ProfileApi";
import { useForm } from "react-hook-form";

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const  [myRole, setMyRole] = useState(null);
    const { data } = useMyProfile(
      (response) => {
        console.log("Perform side effect after data fetching", response);
        const data = response.data;
        // Populate form fields with fetched data
        setValue("username", data?.username);
        setValue("phoneno", data?.phoneno);
        setValue("email", data?.email);
       setMyRole(data?.role);
      }
    );
  const form = useForm();
    const { register, handleSubmit, formState, reset, setValue } = form;
    const { errors } = formState;

  // Save Updated Data
  const handleSave = () => {
    setIsEditing(false);
  };

  // Cancel Editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg">
            <div className="card-header text-white text-center">
              <h3 className="mb-0 title"> Profile : {myRole}</h3>
            </div>
            <div className="card-body">
              <form>
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
                    disabled={!isEditing}
                  />
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                <div className="text-center mt-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-success me-2  title btn-sm"
                        onClick={handleSave}
                      >
                        <FaSave className="me-2" />
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary title  title btn-sm"
                        onClick={handleCancel}
                      >
                        <FaTimes className="me-2" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary title btn-sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit className="me-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
