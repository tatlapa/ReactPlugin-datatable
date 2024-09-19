/**
 * Props for the RowTable component.
 */
interface RowTableProps {
  rows: Array<{ [key: string]: string | number | Date }>;
}

const RowTable: React.FC<RowTableProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row, index) => (
        <tr key={index}>
          {Object.entries(row).map(([key, value]) => (
            <td key={key} className="dt-px-4 dt-py-2">
              {value instanceof Date ? value.toLocaleDateString() : value}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default RowTable;
