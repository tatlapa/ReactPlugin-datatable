import { useState } from "react";

/**
 * Custom hook to handle pagination of rows.
 * 
 * @param {Array<{ [key: string]: any }>} filteredRows - The filtered rows to paginate.
 * @param {number} rowsPerPage - The number of rows per page.
 * @returns {Object} The paginated rows and handlers for pagination.
 */
const usePagination = (filteredRows: Array<{ [key: string]: string | number | Date }>, rowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**
   * Handles change in the number of rows per page.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} _event - The change event for rows per page.
   */
  const handleRowsPerPageChange = (_event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
  };

  /**
   * Handles navigation to the previous page.
   */
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  /**
   * Handles navigation to the next page.
   */
  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const maxPage = Math.ceil(filteredRows.length / rowsPerPage);
      return Math.min(prevPage + 1, maxPage);
    });
  };

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return {
    paginatedRows,
    currentPage,
    handleRowsPerPageChange,
    handlePreviousPage,
    handleNextPage,
  };
};

export default usePagination;