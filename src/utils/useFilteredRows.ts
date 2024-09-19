import { useState, useEffect } from "react";

/**
 * Props for the useFilteredRows hook.
 */
interface FilteredRowsProps {
  rows: Array<{ [key: string]: string | number | Date }>;
  titles: Array<{
    title: string;
    key: string;
    type: "string" | "number" | "date";
  }>;
}

/**
 * Custom hook to filter and sort rows based on search term and sort order.
 * 
 * @param {FilteredRowsProps} props - The properties for filtering and sorting rows.
 * @returns {Object} The filtered rows and handlers for sorting and searching.
 */
const useFilteredRows = ({ rows, titles }: FilteredRowsProps) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  /**
   * Handles sorting of rows based on the specified key and type.
   * 
   * @param {string} key - The key to sort by.
   * @param {"string" | "number" | "date"} type - The type of the key.
   */
  const handleSort = (key: string, type: "string" | "number" | "date") => {
    const sorted = [...sortedRows].sort((a, b) => {
      if (type === "string") {
        return sortOrder === "asc"
          ? (a[key] as string).localeCompare(b[key] as string)
          : (b[key] as string).localeCompare(a[key] as string);
      } else if (type === "number") {
        return sortOrder === "asc" ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]);
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

  /**
   * Handles search input change and filters rows based on the search term.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The search input change event.
   */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  const filteredRows = sortedRows.filter((row) =>
    titles.some((title) =>
      String(row[title.key]).toLowerCase().includes(searchTerm)
    )
  );

  return {
    filteredRows,
    handleSort,
    handleSearch,
    sortKey,
    sortOrder,
    searchTerm,
  };
};

export default useFilteredRows;