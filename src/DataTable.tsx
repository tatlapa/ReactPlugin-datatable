import { useState, useEffect } from "react";
import RowTable from "./components/RowTable";
import FieldTitle from "./components/FieldTitle";
//

interface DataTableProps {
  titles: Array<{
    title: string;
    key: string;
    type: "string" | "number" | "date";
  }>;
  rows: Array<{ [key: string]: any }>;
}

const DataTable: React.FC<DataTableProps> = ({ titles, rows }) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const isAvailable = rows.length === 0;
  const totalEntries = rows.length;

  const handleSort = (key: string, type: "string" | "number" | "date") => {
    const sorted = [...sortedRows].sort((a, b) => {
      if (type === "string") {
        return sortOrder === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else if (type === "number") {
        return sortOrder === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else if (type === "date") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    setSortedRows(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  const filteredRows = sortedRows.filter((row) =>
    titles.some((title) =>
      String(row[title.key]).toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div className="dt-flex dt-flex-col dt-gap-3">
      <div className="dt-flex dt-justify-between dt-items-center">
        <div className="dt-flex dt-items-center">
          Show
          <select className="dt-mx-1 dt-border-2 dt-border-black dt-rounded-md">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
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
            filteredRows.map((row, index) => (
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
            : `Showing 1 to ${filteredRows.length} of ${filteredRows.length} entries`}
        </p>
        <div className="dt-flex dt-gap-3 dt-items-center">
          <a>Previous</a>
          <span className="dt-bg-gray-100 dt-py-2 dt-px-4 dt-border-2 dt-rounded-sm">
            <a>1</a>
          </span>
          <a>Next</a>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
