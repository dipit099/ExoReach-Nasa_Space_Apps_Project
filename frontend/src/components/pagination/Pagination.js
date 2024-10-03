import React from "react";
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Display the current page number and the next two pages
    for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-button ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <div className="page-button" onClick={handlePrevClick} disabled={currentPage === 0}>
      &#8592;
      </div>
      {renderPageNumbers()}
      <button className="page-button" onClick={handleNextClick} disabled={currentPage === totalPages}>
      &#8594;
      </button>
    </div>
  );
};

export default Pagination;
