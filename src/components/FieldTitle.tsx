import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

/**
 * Props for the FieldTitle component.
 */
interface FieldTitleProps {
  title: string;
  sortKey: string;
  currentSortKey: string | null;
  sortOrder: "asc" | "desc";
}

/**
 * FieldTitle component to display the title of a field with sorting indicators.
 * 
 * @param {FieldTitleProps} props - The properties for the FieldTitle component.
 * @returns {JSX.Element} The rendered FieldTitle component.
 */
const FieldTitle: React.FC<FieldTitleProps> = ({
  title,
  sortKey,
  currentSortKey,
  sortOrder,
}) => {
  const isSorted = sortKey === currentSortKey;

  return (
    <div className="dt-flex dt-gap-2 dt-items-center dt-justify-center">
      <h3>{title}</h3>
      <div className="dt-flex dt-flex-col">
        <ChevronUpIcon
          className={`dt-w-4 dt-h-4 ${
            isSorted && sortOrder === "desc" ? "dt-text-black" : "dt-text-gray-500"
          }`}
        />
        <ChevronDownIcon
          className={`dt-w-4 dt-h-4 ${
            isSorted && sortOrder === "asc" ? "dt-text-black" : "dt-text-gray-500"
          }`}
        />
      </div>
    </div>
  );
};

export default FieldTitle;