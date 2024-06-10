'use client';
import { useState } from 'react';
import TableActionsPopover from '@ui/Popovers/TableActions';
import TablePagination from './Pagination';

interface TableColumn {
  field: string;
  headerName: string;
}

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
}

const Table = <T extends { [key: string]: unknown }>({
  columns,
  data,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);

  function isDate(value: unknown): value is Date {
    return value instanceof Date;
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  function displayBooleanValue(value: unknown) {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : '';
    } else {
      return value as React.ReactNode;
    }
  }

  return (
    <div className="rounded-b-2xl border border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
      <div className="max-w-full overflow-x-auto overflow-y-scroll">
        <table className="w-full table-auto">
          <thead className="bg-grey-200 dark:bg-grey-700">
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
          <tbody className="border-b border-grey-300 dark:border-grey-700">
            {currentData.map((row, dataIndex) => (
              <tr key={dataIndex}>
                {columns.map((column, index) => (
                  <td key={index} className="p-4">
                    <p
                      className={`${
                        index === 0 ? 'subtitle2' : 'body2'
                      } text-grey-800 dark:text-white`}
                    >
                      {isDate(row[column.field])
                        ? formatDate(row[column.field] as Date)
                        : displayBooleanValue(row[column.field])}
                    </p>
                  </td>
                ))}
                <td>
                  <TableActionsPopover id={row['id'] as string} />
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="h-14">
            <TablePagination
              length={data.length}
              postsPerPage={postsPerPage}
              setPostsPerPage={setPostsPerPage}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;
