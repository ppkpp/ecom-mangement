import React from "react";

export const ComingSoon = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light text-center"
      style={{ height: "75vh" }}
    >
      <h1 className="display-3 text-primary fw-bold">🚀 Coming Soon</h1>
      <h2 className="text-muted">Exciting features are on the way!</h2>
      <p className="text-secondary">
        We are working hard to bring you something amazing. Stay tuned!
      </p>
      <a href="/" className="btn  mt-3 px-4 py-2 shadow-sm title">
         Back
      </a>
    </div>
  );
};
