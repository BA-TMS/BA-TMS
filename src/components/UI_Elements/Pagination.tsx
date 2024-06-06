import * as React from 'react';
import clsx from 'clsx';
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps,
} from '@mui/base/TablePagination';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function TablePagination() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <tfoot className="w-full h-14 body2 text-grey-800 dark:text-grey-200">
      <tr className="w-full flex justify-end">
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={13} // total number of rows- get from data
          rowsPerPage={rowsPerPage}
          page={page}
          slotProps={{
            select: {
              'aria-label': 'rows per page',
            },
            actions: {
              showFirstButton: false,
              showLastButton: false,
              slots: {
                nextPageIcon: ChevronRightRoundedIcon,
                backPageIcon: ChevronLeftRoundedIcon,
              },
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </tr>
    </tfoot>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const CustomTablePagination = React.forwardRef<
  HTMLTableCellElement,
  TablePaginationProps
>((props, ref) => {
  return (
    <MuiTablePagination
      ref={ref}
      {...props}
      className={clsx('CustomTablePagination p-4', props.className)}
      slotProps={{
        ...props.slotProps,
        select: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.select,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'body2 bg-transparent p-2 transition',
              resolvedSlotProps?.className
            ),
          };
        },
        actions: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.actions,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'flex gap-2 text-center [&>button]:my-0 [&>button]:p-0 [&>button]:flex [&>button]:items-center [&>button]:rounded-full [&>button]:bg-transparent [&>button:hover]:bg-transparent [&>button:focus]:outline-0 [&>button>svg]:text-[22px] [&>button:disabled]:opacity-[0.3]',
              resolvedSlotProps?.className
            ),
          };
        },
        spacer: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.spacer,
            ownerState
          );

          return {
            ...resolvedSlotProps,
            className: clsx('hidden', resolvedSlotProps?.className),
          };
        },
        toolbar: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.toolbar,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'flex flex-col items-start gap-6 md:flex-row md:items-center',
              resolvedSlotProps?.className
            ),
          };
        },
        selectLabel: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.selectLabel,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx('m-0', resolvedSlotProps?.className),
          };
        },
        displayedRows: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.displayedRows,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx('m-0 md:ml-auto', resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});

CustomTablePagination.displayName = 'TablePagination';
