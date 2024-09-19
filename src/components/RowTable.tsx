/**
 * Props for the RowTable component.
 */
interface RowTableProps {
  rows: Array<{ [key: string]: string | number | Date }>;
}

/**
 * RowTable component to render table cells for each row.
 * 
 * @param {RowTableProps} props - The properties for the RowTable component.
 * @returns {JSX.Element} The rendered table cells.
 */
const RowTable: React.FC<RowTableProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row, index) =>
        Object.entries(row).map(([key, value]) => (
          <td key={`${index}-${key}`} className="dt-px-4 dt-py-2">
            {value instanceof Date ? value.toLocaleDateString() : value}
          </td>
        ))
      )}
    </>
  );
};

export default RowTable;