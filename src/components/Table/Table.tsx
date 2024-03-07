interface TableProps {
  columns: string[];
  data: Record<string, any>[]; // adjust
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className="whitespace-nowrap px-3 py-4 text-md text-gray-500"
                  >
                    {row.name}
                    {console.log(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
