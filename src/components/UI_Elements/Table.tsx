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
}

const Table: React.FC<TableProps<any>> = ({ columns, data }) => {
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
    <div className="rounded-2xl border border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
      <div className="h-26 p-4">
        <p>Searchbar Placeholder</p>
      </div>
      <div className="max-w-full overflow-x-auto overflow-y-scroll">
        <table className="w-full table-auto">
          <thead className=" bg-grey-200 dark:bg-grey-700">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left p-4 font-public font-semibold text-table-title text-grey-600 dark:text-white"
                >
                  {column.headerName}
                </th>
              ))}
              <th className="text-left p-4 font-public font-semibold text-table-title text-grey-600 dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, dataIndex) => (
              <tr key={dataIndex}>
                {columns.map((column, index) => (
                  <td key={index} className="p-4">
                    <p
                      className={`${
                        index === 0 ? 'subtitle2' : 'body2' // only the first column is bold
                      } text-grey-800 dark:text-white`}
                    >
                      {/* check if the value is a date */}
                      {isDate(data[column.field])
                        ? formatDate(data[column.field])
                        : displayBooleanValue(data[column.field])}
                    </p>
                  </td>
                ))}
                <td className="p-4 text-left">
                  {/* Table Actions Popover is not functional yet */}
                  <TableActionsPopover id={data.id}></TableActionsPopover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
