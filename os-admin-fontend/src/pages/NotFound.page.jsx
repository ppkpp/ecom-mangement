import React from "react";

export const NotFoundPage = () => {
  
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light"
      style={{ height: "75vh" }} // Set custom height
    >
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="text-muted">Page Not Found</h2>
      <p className="text-center text-secondary">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="btn title mt-3 px-4 py-2">
        Go Back Home
      </a>
    </div>
  );
};
