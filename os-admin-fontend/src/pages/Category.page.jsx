import { FaPlus, FaRegTrashAlt, FaPen, FaExclamationTriangle } from "react-icons/fa";
import {  useDeleteCategory, usePaginateCategoryList } from "../hooks/useCategoryApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TablePaginate } from "../components/TablePaginate";

export const CategoryPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error, refetch } = usePaginateCategoryList(
    pageNumber,
    (data) => {
      console.log("Perform side effect after data fetching", data);
    }
  );

  const { mutate: deleteCategory } = useDeleteCategory();
  const handleDelete = async (id) => {
    await deleteCategory(id);
  };

  const handleEdit = (id) => {
    navigate("/add-category/" + id);
  };
  return (
    <>
      <div className="page-title">
        <h3>
          <span className="title">Category</span>
          <Link
            to="/add-category"
            className="btn btn-sm btn-outline-primary float-end"
          >
            <FaPlus size={16} /> Add Category
          </Link>
        </h3>
      </div>
      <div className="col-md-12 col-lg-12">
        <div className="card">
          <div className="card-body">
            <p className="card-title">Category List</p>
            <div className="table-responsive">
              <table
                width="100%"
                className="table table-sm table-striped table-hover  table-responsive"
                id="dataTables-example"
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
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
                    data?.data.data.map((category) => (
                      <tr key={category.id} className="align-middle">
                        <td>{category.id}</td>
                        <td>
                          <img
                            src={
                              category.upload_img
                                ? `${SERVER_URL}${category.upload_img}`
                                : "/vite.svg"
                            }
                            alt={category.name}
                            width="40"
                            height="40"
                            className="rounded-circle"
                            style={{
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                        </td>
                        <td>{category.name}</td>
                        <td>
                          {new Date(category.created_at).toLocaleDateString()}
                        </td>
                        <td
                          className="text-truncate"
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {category.description}
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            title="Edit Category"
                            onClick={() => handleEdit(category.id)}
                          >
                            <FaPen />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            title="Delete Category"
                            onClick={() => handleDelete(category.id)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
                {!isLoading &&
                    !isError && <TablePaginate
                meta={data?.data.meta}
                setPageNumber={setPageNumber}
              />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
