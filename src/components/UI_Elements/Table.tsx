import TableActionsPopover from '@ui/Popovers/TableActions';

// pass this table an array of objects containing keys field and headerName
// field is what the property is on the data object from the database
// headerName is what we want the table column name to be

interface TableColumn {
  field: string;
  headerName: string;
}

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  deleter: any;
}

const Table: React.FC<TableProps<any>> = ({ columns, data, deleter }) => {
  // check if data type is Date object
  function isDate(value: any): boolean {
    return value instanceof Date;
  }
  // format date
  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  // helper function for checking boolean values
  function displayBooleanValue(value: any) {
    if (typeof value === 'boolean') {
      // 'yes' for true, and nothing for false
      return value ? 'Yes' : '';
    } else {
      // if not a boolean will return just the value
      return value;
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto overflow-y-scroll">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="min-w-[120px] py-5 px-4 text-center font-medium text-black dark:text-white xl:pl-11"
                >
                  {column.headerName}
                </th>
              ))}
              <th className="py-5 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, dataIndex) => {
              return (
                <tr
                  key={dataIndex}
                  className={
                    dataIndex === data.length - 1
                      ? ''
                      : 'border-b border-[#eee] dark:border-strokedark'
                  }
                >
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={`py-4 px-4 pl-9 text-left ${
                        index === columns.length - 1
                          ? ''
                          : 'border-b border-[#eee] dark:border-strokedark'
                      } xl:pl-11`}
                    >
                      <h5 className="font-medium text-center text-black dark:text-white">
                        {/* check if the value is a date */}
                        {isDate(data[column.field])
                          ? formatDate(data[column.field])
                          : displayBooleanValue(data[column.field])}
                      </h5>
                    </td>
                  ))}
                  <td>
                    {/* Table Actions Popover is not functional yet */}
                    <TableActionsPopover
                      id={data.id}
                      deleter={deleter}
                      data={data}
                    ></TableActionsPopover>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
