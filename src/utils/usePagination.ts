import { useState } from "react";

const usePagination = (filteredRows: Array<{ [key: string]: any }>, rowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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