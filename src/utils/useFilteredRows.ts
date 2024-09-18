import { useState, useEffect } from "react";

interface FilteredRowsProps {
  rows: Array<{ [key: string]: any }>;
  titles: Array<{
    title: string;
    key: string;
    type: "string" | "number" | "date";
  }>;
}

const useFilteredRows = ({ rows, titles }: FilteredRowsProps) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

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