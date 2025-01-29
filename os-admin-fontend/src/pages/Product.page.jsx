import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDeleteProduct,
  usePaginateProductList,
} from "../hooks/useProductApi";
import { ProductCard } from "../components/product/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { TablePaginate } from "../components/TablePaginate";

export const ProductPage = () => {
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [hasFilters, setHasFilters] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
  });

  // React Hook Form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: searchParams,
  });

  // Fetch products with pagination & filters
  const { isLoading, data, isError, error, refetch } = usePaginateProductList(
    pageNumber,
    searchParams,
    (data) => console.log("Fetched Products:", data)
  );

  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = async (id) => {
    await deleteProduct(id);
    refetch();
  };

  // Handle search form submission
  const onSubmit = (values) => {
    setHasFilters(true)
    setSearchParams(values);
    setPageNumber(1);
    refetch();
  };

  // Reset search filters
  const handleReset = () => {
    reset({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
    });
    setSearchParams({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
    });
    setHasFilters(false)
    setPageNumber(1);
   
    refetch();
  };

  return (
    <>
      {/* <div className="page-title d-flex justify-content-between align-items-center">
        <h3 className="m-0">Products</h3>
        <Link to="/add-product" className="btn btn-outline-primary">
          <FaPlus className="me-1" /> Add Product
        </Link>
      </div> */}

      <div className="col-12 mt-3">
        {/* Search Bar */}
        <form
          className="p-3 bg-light rounded shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row g-2 align-items-center">
            <div className="col-md">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name..."
                {...register("searchTerm")}
              />
            </div>
            <div className="col-md">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Min Price"
                {...register("minPrice")}
              />
            </div>
            <div className="col-md">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max Price"
                {...register("maxPrice")}
              />
            </div>
            <div className="col-md">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Min Stock"
                {...register("minStock")}
              />
            </div>
            <div className="col-md">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max Stock"
                {...register("maxStock")}
              />
            </div>
            <div className="col-md-auto d-flex gap-2">
              {!hasFilters && (
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  aria-label="Search" // Add aria-label for accessibility
                >
                  <FaSearch className="me-1" />
                </button>
              )}

              {hasFilters && (
                <button
                  type="button"
                  className="btn btn-secondary d-flex align-items-center justify-content-center"
                  onClick={handleReset}
                  aria-label="Reset" // Add aria-label for accessibility
                >
                  <FaTimes className="me-1" />
                </button>
              )}

              <Link
                to="/add-product"
                className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                aria-label="Add Product" // Add aria-label for accessibility
              >
                <FaPlus /> {/* Icon only */}
              </Link>
            </div>
          </div>
        </form>
        <div className="row mt-3">
          {isLoading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!isLoading &&
            !isError &&
            data?.data?.data?.map((product) => (
              <ProductCard
                key={product.id}
                SERVER_URL={SERVER_URL}
                product={product}
                onEdit={() => navigate("/add-product/" + product.id)}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
        </div>
        {!isLoading && !isError && (
          <TablePaginate
            meta={data?.data?.meta}
            setPageNumber={setPageNumber}
          />
        )}
      </div>
    </>
  );
};
