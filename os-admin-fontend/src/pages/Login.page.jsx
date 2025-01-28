import React from "react";
import "../assets/styles/auth.css";
import { useAuth } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginNow } from "../api/loginApi";
export const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const redirectPath = location.state?.path || "/";

  const onSubmit = async (formdata) => {
    const response = await loginNow(formdata);
    auth.login(response.data);
    navigate(redirectPath, { replace: true });
    // Handle successful login (e.g., store token, redirect)
  };
  return (
    <>
      <div className="wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img
                  className="brand  img-fluid rounded"
                  src="/icon.svg"
                  alt="bootstraper logo"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              </div>
              <h6 className="mb-4 text-muted">Login to your account</h6>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3 text-start">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter Username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required.",
                      },
                    })}
                  />

                  <p style={{ color: "red" }} className="label mt-2">
                    {errors.username?.message}
                  </p>
                </div>
                <div className="mb-3 text-start">
                  <label className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required.",
                      },
                    })}
                  />
                  <p style={{ color: "red" }} className="label mt-2">
                    {errors.password?.message}
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mb-4"
                  style={{ width: "100%" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
