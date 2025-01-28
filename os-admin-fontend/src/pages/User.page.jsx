import React from "react";
import { FaExclamationTriangle, FaPen, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUserDelete, useUserList } from "../hooks/useUserApi";
import { useAuth } from "../utils/auth";
export const UserPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const auth = useAuth();
  const { isLoading, data, isError, error, refetch } = useUserList();
  const { mutate: deleteCategory } = useUserDelete();
  const handleDelete = async (id) => {
    await deleteCategory(id);
  };
  const handleEdit = (id) => {
    navigate("/add-user/" + id);
  };
  return (
    <>
      <div className="page-title">
        <h3>
          <span className="title">User Management</span>
          {auth.user.role === "manager" && (
            <Link
              to="/add-user"
              className="btn btn-sm btn-outline-primary float-end"
            >
              <FaPlus size={16} /> Add User
            </Link>
          )}
        </h3>
      </div>
      <div className="col-md-12 col-lg-12">
        <div className="card">
          <div className="card-body">
            <p className="card-title">User List</p>
            <div className="table-responsive"></div>
            {/* Table */}
            <table
              width="100%"
              className="table table-sm table-striped table-hover  table-responsive"
              id="dataTables-example"
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Created AT</th>
                  <th scope="col">Active</th>
                 {auth.user.role === "manager" && <th scope="col">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {/* Loading State */}
                {isLoading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <div
                          className="spinner-border text-primary me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span>Loading Data...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Error State */}
                {isError && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="alert alert-danger d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        <span>⚠️ Error: {error.message}</span>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={refetch}
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {!isLoading &&
                  !isError &&
                  data?.data.map((user) => (
                    <tr key={user.id} className="align-middle">
                      <td>{user.id}</td>
                      <td>
                        <img
                          src={
                            user.upload_img
                              ? `${SERVER_URL}${user.upload_img}`
                              : "/icon.svg"
                          }
                          alt={user.username}
                          width="40"
                          height="40"
                          className="rounded-circle"
                          style={{
                            objectFit: "cover",
                            border: "1px solid #ddd",
                          }}
                        />
                      </td>
                      <td>{user.username}</td>

                      <td className="custom-text">{user.role}</td>
                      <td>{user.phoneno}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className="custom-text">
                          {user.active ? "Active" : "Banned"}
                        </span>
                      </td>
                       {auth.user.role === "manager" ?? <td className="text-start">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          title="Edit User"
                          onClick={() => handleEdit(user.id)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Delete User"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
