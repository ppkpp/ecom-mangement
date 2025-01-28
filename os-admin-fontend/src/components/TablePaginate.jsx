import React from "react";

export const TablePaginate = ({ meta, setPageNumber }) => {
  const handleNextPage = () => {
    if (meta.page < meta.totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (meta.page > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <nav
      aria-label="Page navigation example"
      className="d-flex justify-content-center mt-3"
    >
      <ul className="pagination pagination-md shadow-sm p-2 rounded">
        {/* Previous Button */}
        <li className={`page-item ${meta.page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePreviousPage}
            aria-label="Previous"
            disabled={meta.page === 1}
            style={{
              cursor: meta.page === 1 ? "not-allowed" : "pointer",
              backgroundColor: meta.page === 1 ? "#e9ecef" : "#ffffff",
              color: meta.page === 1 ? "#6c757d" : "#007bff",
              borderColor: "#dee2e6",
            }}
          >
            &laquo;
          </button>
        </li>

        {/* Dynamic Page Numbers */}
        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <li
              key={page}
              className={`page-item ${meta.page === page ? "active" : ""}`}
              style={{ transition: "0.3s" }}
            >
              <button
                className="page-link"
                onClick={() => setPageNumber(page)}
                style={{
                  cursor: "pointer",
                  fontWeight: meta.page === page ? "bold" : "normal",
                  backgroundColor: meta.page === page ? "#007bff" : "#ffffff",
                  color: meta.page === page ? "#ffffff" : "#007bff",
                  borderColor: meta.page === page ? "#007bff" : "#dee2e6",
                }}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next Button */}
        <li
          className={`page-item ${
            meta.page === meta.totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={handleNextPage}
            aria-label="Next"
            disabled={meta.page === meta.totalPages}
            style={{
              cursor: meta.page === meta.totalPages ? "not-allowed" : "pointer",
              backgroundColor:
                meta.page === meta.totalPages ? "#e9ecef" : "#ffffff",
              color: meta.page === meta.totalPages ? "#6c757d" : "#007bff",
              borderColor: "#dee2e6",
            }}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
