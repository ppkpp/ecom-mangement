import React from "react";

export const StatCard = ({ title, value, icon, className }) => {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className={`card shadow-sm ${className}`}>
        <div className="card-body d-flex align-items-center">
          <div className="me-3 display-6">{icon}</div>
          <div>
            <h6 className="fw-normal">{title}</h6>
            <h4 className="fw-bold mb-0">{value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
