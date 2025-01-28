import React from "react";
import { FaPen, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useBannerList, useDeleteBanner } from "../hooks/useBannerApi";

export const BannerPage = () => {
     const SERVER_URL = import.meta.env.VITE_SERVER_URL;
     const navigate = useNavigate();
  const { isLoading, data, isError, error, refetch } = useBannerList((data) => {
    console.log("Perform side effect after data fetching", data);
  });

  const { mutate: deleteBanner } = useDeleteBanner();
  const handleDelete = async (id) => {
    await deleteBanner(id);
  };

  const handleEdit = (id) => {
    navigate("/add-banner/" + id);
  };

  return (
    <>
      <div className="page-title">
        <h3>
          <span className="title">Banner</span>
          <Link
            to="/add-banner"
            className="btn btn-sm btn-outline-primary float-end"
          >
            <FaPlus size={16} /> Add Banner
          </Link>
        </h3>
      </div>
      <div className="col-md-12 col-lg-12">
        <div className="card">
          <div className="card-body">
            <p className="card-title">Banner List</p>
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
                    data?.data.map((banner) => (
                      <tr key={banner.id} className="align-middle">
                        <td>{banner.id}</td>
                        <td>
                          <img
                            src={
                              banner.upload_img
                                ? `${SERVER_URL}${banner.upload_img}`
                                : "/vite.svg"
                            }
                            alt={banner.name}
                            width="40"
                            height="40"
                            className="rounded-circle"
                            style={{
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                        </td>
                        <td>{banner.name}</td>
                        <td>
                          {new Date(banner.created_at).toLocaleDateString()}
                        </td>

                        <td className="text-end">
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            title="Edit"
                            onClick={() => handleEdit(banner.id)}
                          >
                            <FaPen />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            title="Delete"
                            onClick={() => handleDelete(banner.id)}
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
