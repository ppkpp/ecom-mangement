import React, { useState } from "react";
import {
  useDeleteProduct,
  usePaginateProductList,
} from "../hooks/useProductApi";
import { ProductCard } from "../components/product/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { TablePaginate } from "../components/TablePaginate";
export const ProductPage = () => {
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  //const { isLoading, data, isError, error, refetch } = useProductList();
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error, refetch } = usePaginateProductList(
    pageNumber,
    (data) => {
      console.log("Perform side effect after data fetching", data);
    }
  );


  const { mutate: deleteProduct } = useDeleteProduct();
    const handleDelete = async (id) => {
      await deleteProduct(id);
    };
  return (
    <>
      <div className="page-title">
        <h3>
          <span className="title">ProductS</span>
          <Link
            to="/add-product"
            className="btn btn-sm btn-outline-primary float-end"
          >
            <FaPlus size={16} /> Add Product
          </Link>
        </h3>
      </div>
      <div className="col-md-12 col-lg-12">
        <div className="row">
          {isLoading && (
            <tr>
              <td colSpan="6" className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
          {!isLoading &&
            !isError &&
            data?.data.data.map((product) => (
              <ProductCard
                key={product.id}
                SERVER_URL={SERVER_URL}
                product={product}
                onEdit={() => {
                  navigate("/add-product/" + product.id); // Correct usage of navigate
                }}
                onDelete={() => {
                  handleDelete(product.id);
                }}
              />
            ))}

          {!isLoading && !isError && (
            <TablePaginate
              meta={data?.data.meta}
              setPageNumber={setPageNumber}
            />
          )}
        </div>
      </div>
    </>
  );
};
