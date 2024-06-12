import * as React from 'react';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList, TabsListProps } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel, TabPanelProps } from '@mui/base/TabPanel';
import { Tab as BaseTab, TabProps } from '@mui/base/Tab';

// props will need to be tab names + number

export default function CustomTabs() {
  return (
    <Tabs defaultValue={0}>
      <TabsList>
        <Tab value={0}>All</Tab>
        <Tab value={1}>On Route</Tab>
        <Tab value={2}>Open</Tab>
      </TabsList>
      {/* <TabPanel value={0}>My account page</TabPanel>
        <TabPanel value={1}>Profile page</TabPanel>
        <TabPanel value={2}>Language page</TabPanel> */}
    </Tabs>
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

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseTabsList
        ref={ref}
        className={clsx(
          'subtitle2 px-6 h-14 rounded-t-2xl border-x border-t border-grey-300 dark:border-grey-700 bg-grey-200 dark:bg-grey-700 flex items-center justify-start content-between gap-10',
          className
        )}
        {...other}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  return (
    <BaseTab
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `subtitle2 ${
                // font family
                ownerState.selected
                  ? 'text-grey-800 bg-transparent border-b border-b-grey-800 border-b-2'
                  : 'text-grey-600 bg-transparent hover:border-b hover:border-b-grey-800 hover:border-b-2'
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              } w-auto py-2.5 flex border-b border-transparent border-b-2 justify-center`,
              // this is where the width of the actual tabs changes
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});

Tab.displayName = 'Tab';

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseTabPanel
        ref={ref}
        className={clsx(
          // 'py-5 px-3 bg-primary dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 rounded-xl opacity-60 w-full font-sans text-sm',
          className
        )}
        {...other}
      />
    );
  }
);

TabPanel.displayName = 'TabPanel';
