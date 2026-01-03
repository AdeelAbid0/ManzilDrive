import { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = useMemo(() => {
    const pages = [];

    // Always show first 3 pages
    const firstPagesToShow = 3;
    // Always show last 2 pages
    const lastPagesToShow = 2;

    // If total pages are 5 or less, show all pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Add first 3 pages
      for (let i = 1; i <= firstPagesToShow; i++) {
        pages.push(i);
      }

      // Add ellipsis if there are pages between first 3 and last 2
      if (totalPages > firstPagesToShow + lastPagesToShow) {
        pages.push("...");
      }

      // Add last 2 pages
      for (let i = totalPages - lastPagesToShow + 1; i <= totalPages; i++) {
        if (i > firstPagesToShow) {
          // Avoid duplicates if there's an overlap
          pages.push(i);
        }
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full justify-center md:justify-between items-center">
      <div className="md:flex hidden items-center">
        <p className="text-[#5B5F5F] font-medium text-xs leading-4">
          {currentPage} / {totalPages}
        </p>
      </div>
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 py-[10px] text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white text-primary border border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="w-6 h-4" />
          Previous
        </button>
        <div className="flex items-center gap-1 mx-2">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`flex items-center justify-center w-8 h-8 text-sm rounded-md
              ${page === "..." ? "cursor-default" : "cursor-pointer"}
              ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-white text-secondary hover:bg-gray-50 border border-gray-200"
              }
            `}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 py-[10px] text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white text-primary border border-gray-200 hover:bg-gray-50"
        >
          Next <ArrowRight className="w-6 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
