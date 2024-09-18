import { useState } from "react";
import RowTable from "./components/RowTable";
import FieldTitle from "./components/FieldTitle";
import useFilteredRows from "./utils/useFilteredRows";
import usePagination from "./utils/usePagination";

interface DataTableProps {
  titles: Array<{
    title: string;
    key: string;
    type: "string" | "number" | "date";
  }>;
  rows: Array<{ [key: string]: any }>;
}

const DataTable: React.FC<DataTableProps> = ({ titles, rows }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const {
    filteredRows,
    handleSort,
    handleSearch,
    sortKey,
    sortOrder,
    searchTerm,
  } = useFilteredRows({ rows, titles });

  const {
    paginatedRows,
    currentPage,
    handleRowsPerPageChange,
    handlePreviousPage,
    handleNextPage,
  } = usePagination(filteredRows, rowsPerPage);

  const isAvailable = rows.length === 0;
  const totalEntries = rows.length;

  return (
    <div className="dt-flex dt-flex-col dt-gap-3">
      <div className="dt-flex dt-justify-between dt-items-center">
        <div className="dt-flex dt-items-center">
          Show
          <select
            className="dt-mx-1 dt-border-2 dt-border-black dt-rounded-md"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              handleRowsPerPageChange(e);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          entries
        </div>
        <div className="dt-flex dt-gap-2 dt-items-center">
          Search:
          <input
            type="text"
            className="dt-border-2 dt-border-black dt-rounded-md dt-p-1"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr role="row">
            {titles.map((title, index) => (
              <th
                key={index}
                className="dt-cursor-pointer"
                onClick={() => handleSort(title.key, title.type)}
              >
                <FieldTitle
                  title={title.title}
                  sortKey={title.key}
                  currentSortKey={sortKey}
                  sortOrder={sortOrder}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isAvailable ? (
            <tr role="row">
              <td
                valign="top"
                colSpan={titles.length}
                className="dt-text-center dt-bg-gray-100 dt-border-y dt-border-black dt-py-3"
              >
                No data available in table
              </td>
            </tr>
          ) : filteredRows.length === 0 ? (
            <tr role="row">
              <td
                valign="top"
                colSpan={titles.length}
                className="dt-text-center dt-bg-gray-100 dt-border-y dt-border-black dt-py-3"
              >
                No matching records found
              </td>
            </tr>
          ) : (
            paginatedRows.map((row, index) => (
              <tr role="row" key={index}>
                <RowTable
                  rows={Object.entries(row)
                    .filter(([key]) => key !== "id")
                    .map(([, value]) => value)}
                />
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="dt-flex dt-justify-between dt-items-center">
        <p>
          {isAvailable
            ? "Showing 0 to 0 of 0 entries"
            : filteredRows.length === 0
            ? `Showing 0 to 0 of 0 entries (filtered from ${totalEntries} total entries)`
            : `Showing ${(currentPage - 1) * rowsPerPage + 1} to ${
                Math.min(currentPage * rowsPerPage, filteredRows.length)
              } of ${filteredRows.length} entries`}
        </p>
        <div className="dt-flex dt-gap-3 dt-items-center">
          <a onClick={handlePreviousPage} className="dt-cursor-pointer">
            Previous
          </a>
          <span className="dt-bg-gray-100 dt-py-2 dt-px-4 dt-border-2 dt-rounded-sm">
            <a>{currentPage}</a>
          </span>
          <a onClick={handleNextPage} className="dt-cursor-pointer">
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default DataTable;