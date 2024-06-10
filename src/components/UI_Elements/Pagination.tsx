import * as React from 'react';
import clsx from 'clsx';
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps,
} from '@mui/base/TablePagination';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

interface PaginationProps {
  length: number;
  postsPerPage: number;
  handlePagination: (page: number) => void;
  setPostsPerPage: (event: number) => void;
  currentPage: number;
}

export default function TablePagination({
  length,
  postsPerPage,
  handlePagination,
  setPostsPerPage,
  currentPage,
}: PaginationProps) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    handlePagination(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('change rows', event.target.value);
    setPostsPerPage(Number(event.target.value));
  };

  return (
    <tr className="w-full body2 text-grey-800 dark:text-grey-200">
      <td className="w-full flex justify-end">
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={length}
          rowsPerPage={postsPerPage}
          page={currentPage}
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
      </td>
    </tr>
  );
}

type SlotPropsFn<TArgs, TResult> = (args: TArgs) => TResult;
type SlotProps<TArgs, TResult> = TResult | SlotPropsFn<TArgs, TResult>;

const resolveSlotProps = <TArgs, TResult>(
  fn: SlotProps<TArgs, TResult>,
  args: TArgs
): TResult => {
  return typeof fn === 'function'
    ? (fn as SlotPropsFn<TArgs, TResult>)(args)
    : fn;
};

const CustomTablePagination = React.forwardRef<
  HTMLTableCellElement,
  TablePaginationProps
>((props, ref) => {
  return (
    <MuiTablePagination
      ref={ref}
      {...props}
      className={clsx('CustomTablePagination', props.className)}
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
              'body2 bg-transparent py-2 transition',
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
              'flex gap-2 p-2 mr-2 text-center [&>button]:my-0 [&>button]:p-0 [&>button]:flex [&>button]:items-center [&>button]:rounded-full [&>button]:bg-transparent [&>button:hover]:bg-transparent [&>button:focus]:outline-0 [&>button>svg]:text-[22px] [&>button:disabled]:opacity-[0.3]',
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
            className: clsx('flex', resolvedSlotProps?.className),
          };
        },
        selectLabel: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.selectLabel,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx('py-2 mr-6', resolvedSlotProps?.className),
          };
        },
        displayedRows: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.displayedRows,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'py-2 w-20 mx-6 text-center',
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});

CustomTablePagination.displayName = 'TablePagination';
