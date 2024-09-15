interface RowTableProps {
  rows: any[];
}

const RowTable: React.FC<RowTableProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row, index) => (
        <td key={index} className="dt-px-4 dt-py-2">{row}</td>
      ))}
    </>
  );
};

export default RowTable;
