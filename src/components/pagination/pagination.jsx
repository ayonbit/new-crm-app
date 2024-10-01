"use client";
// Dependencies
import { Button } from "../ui/button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-between items-center w-full py-2">
      {/* Left side: Page info */}
      <div className="text-left">
        <span>
          Page {currentPage} of {totalPages > 0 ? totalPages : 1} Pages
        </span>
      </div>

      {/* Right side: Navigation buttons */}
      <div className="flex space-x-2 text-right">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages <= 1}
          aria-label="Previous Page"
          size="custom"
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages <= 1}
          aria-label="Next Page"
          size="custom"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
