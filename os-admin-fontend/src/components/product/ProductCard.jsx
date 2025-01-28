import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import "./ProductCard.css"; // Importing the CSS file
import { LazyLoadImage } from "react-lazy-load-image-component";
export const ProductCard = ({ product, SERVER_URL, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback to default image in case of an error
  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  // Helper function to determine stock level badge color
  const getStockBadgeColor = (stock) => {
    if (stock > 50) return "bg-success"; // Plenty of stock
    if (stock > 10) return "bg-warning"; // Limited stock
    return "bg-danger"; // Out of stock or very low stock
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card product-card border-0 shadow-lg rounded overflow-hidden position-relative">
        {/* Stock Badge (Top Left Corner) */}
        <div className="position-absolute top-0 start-0 p-5 mt-1">
          <span
            className={`badge product-title ${getStockBadgeColor(
              product.stock
            )} text-white`}
          >
            {product.stock ? `Stock: ${product.stock}` : "Out of Stock"}
          </span>
        </div>

        {/* Product Image */}
        <LazyLoadImage
          src={
            imageError || !product.upload_img
              ? "/vite.svg" // Fallback image
              : `${SERVER_URL}${product.upload_img}`
          }
          alt={product.name}
          className="card-img-top product-img lazyload"
          width="100%"
          height="200"
          style={{ objectFit: "cover" }}
          onError={handleImageError} // Handle image error
        />

        {/* Edit & Delete Icons (Top Right Corner) */}
        <div className="position-absolute top-0 end-0 p-2">
          <button
            className="btn btn-primary btn-sm mx-1 shadow-sm"
            onClick={() => onEdit(product.id)}
            style={{ zIndex: 2 }}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm mx-1 shadow-sm"
            onClick={() => onDelete(product.id)}
            style={{ zIndex: 2 }}
          >
            <FaTrash />
          </button>
        </div>

        {/* Product Details */}
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            {/* Product Name */}
            <h5 className="product-title text-truncate mb-0">{product.name}</h5>
          </div>

          {/* Product Category */}
          <p className="product-category card-text text-muted mt-1">
            {product.category ? product.category.name : "No Category"}
          </p>

          {/* Product Price */}
          <p className="product-title card-text text-muted mt-1">
            {formatPrice(product.price)} MMK
          </p>

          {/* Product Promotion */}
          {product.promotion && (
            <span className="promotion-badge">{product.promotion}% off</span>
          )}
        </div>
      </div>
    </div>
  );
};
