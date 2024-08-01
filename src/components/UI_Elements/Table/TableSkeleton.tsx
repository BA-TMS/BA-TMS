// placeholder for table loading state

import TablePagination from './Pagination';

const TableSkeleton = () => {
  return (
    <div className="rounded-b-2xl border border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
      <div className="max-w-full overflow-x-auto overflow-y-scroll">
        <table className="w-full table-auto">
          <thead className="bg-grey-200 dark:bg-grey-700">
            <tr>
              <th className="text-left p-4 font-public font-semibold text-table-title text-grey-600 dark:text-white"></th>
            </tr>
          </thead>
          <tbody className="border-b border-grey-300 dark:border-grey-700">
            <tr>
              <td className="body1 p-10 text-center">Loading Data</td>
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
