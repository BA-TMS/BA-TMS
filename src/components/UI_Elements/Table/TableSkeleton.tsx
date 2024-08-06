import TablePagination from './Pagination';

// placeholder for table loading state
// still pass in column names

interface TableSkeletonColumn {
  field: string;
  headerName: string;
}

interface TableSkeletonProps {
  columns: TableSkeletonColumn[];
}

const TableSkeleton = ({ columns }: TableSkeletonProps) => {
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
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="h-8 bg-grey-300 dark:bg-grey-700 rounded-full my-2 animate-pulse"></div>
              </td>
            </tr>
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="h-8 bg-grey-300 dark:bg-grey-700 rounded-full mb-2 animate-pulse"></div>
              </td>
            </tr>
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="h-8 bg-grey-300 dark:bg-grey-700 rounded-full mb-2 animate-pulse"></div>
              </td>
            </tr>
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="h-8 bg-grey-300 dark:bg-grey-700 rounded-full mb-2 animate-pulse"></div>
              </td>
            </tr>
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="h-8 bg-grey-300 dark:bg-grey-700 rounded-full mb-2 animate-pulse"></div>
              </td>
            </tr>
          </tbody>

          <tfoot className="h-14">
            <TablePagination
              length={0}
              postsPerPage={0}
              setPostsPerPage={() => null}
              handlePagination={() => null}
              currentPage={0}
            />
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
