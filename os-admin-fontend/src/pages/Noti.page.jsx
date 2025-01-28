import React from "react";
import { FaPen, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteNoti, useNotiList } from "../hooks/useNotiApi";

export const NotiPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const { isLoading, data, isError, error, refetch } = useNotiList((data) => {
    console.log("Perform side effect after data fetching", data);
  });

  const { mutate: deleteNoti } = useDeleteNoti();
  const handleDelete = async (id) => {
    await deleteNoti(id);
  };

  const handleEdit = (id) => {
    navigate("/add-noti/" + id);
  };

  return (
    <>
      <div className="page-title">
        <h3>
          <span className="title">Notification</span>
          <Link
            to="/add-noti"
            className="btn btn-sm btn-outline-primary float-end"
          >
            <FaPlus size={16} /> Create New Notification
          </Link>
        </h3>
      </div>
      <div className="col-md-12 col-lg-12">
        <div className="card">
          <div className="card-body">
            <p className="card-title">Notification List</p>
            <div className="table-responsive">
              <table
                width="100%"
                className="table  table-sm"
                id="dataTables-example"
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>

                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {isError && (
                    <tr>
                      <td colSpan="6" className="text-center text-danger">
                        <div className="alert alert-danger">
                          ⚠️ Error: {error.message}
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

                  {!isLoading &&
                    !isError &&
                    data?.data.map((noti) => (
                      <tr key={noti.id} className="align-middle">
                        <td>{noti.id}</td>
                        <td>
                          <img
                            src={
                              noti.upload_img
                                ? `${SERVER_URL}${noti.upload_img}`
                                : "/vite.svg"
                            }
                            alt={noti.title}
                            width="40"
                            height="40"
                            className="rounded-circle"
                            style={{
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                        </td>
                        <td>{noti.title}</td>
                        <td>{noti.description}</td>
                        <td>
                          {new Date(noti.created_at).toLocaleDateString()}
                        </td>

                        <td className="text-end">
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            title="Edit"
                            onClick={() => handleEdit(noti.id)}
                          >
                            <FaPen />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            title="Delete"
                            onClick={() => handleDelete(noti.id)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
