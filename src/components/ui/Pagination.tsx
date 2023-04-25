import React, { useState, useEffect } from 'react';

// import Icons
import Chevron from '../ui/icons/Chevron'
import PrevNext from '../ui/icons/PrevNext'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const pages: any = [];
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setVisiblePages(pages);
  }, [totalPages, currentPage]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-container">
      <button onClick={handleFirstPage} className="btn-pagination"><PrevNext classname="icon" /></button>
      <button onClick={handlePrevPage} className="btn-pagination btn-left"><Chevron classname="icon" /></button>
      {visiblePages.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)} className={`btn-pagination ${page === currentPage ? "current-page" : ""}`} disabled={page === currentPage ? true : false}>
          {page}
        </button>
      ))}
      <button onClick={handleNextPage} className="btn-pagination"><Chevron classname="icon" /></button>
      <button onClick={handleLastPage} className="btn-pagination btn-right"><PrevNext classname="icon" /></button>
    </div>
  );
};

export default Pagination;