import * as React from 'react';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList, TabsListProps } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel, TabPanelProps } from '@mui/base/TabPanel';
import { Tab as BaseTab, TabProps } from '@mui/base/Tab';
import TabLabel from './TabLabel';

// this is the MUI tab
// is styled by TabLabel
// pass an array of objects to generate Tab Labels
// color is the color we want the tab
// value is the name on the tab

export interface TabData {
  color:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'default';
  value: string;
}

interface CustomTabsProps {
  tabs: TabData[];
  sort: (value: string) => void;
  count: (value: string) => number;
}

export function CustomTabs({ tabs, sort, count }: CustomTabsProps) {
  const [activeTab, setActiveTab] = React.useState('All');

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | number | null
  ) => {
    if (typeof newValue === 'string') {
      // must be string for our state
      setActiveTab(newValue);
      sort(newValue);
    }
  };

  return (
    <Tabs
      value={activeTab}
      aria-label="tabs"
      onChange={handleTabChange} // Callback invoked when new value is being set
    >
      <TabsList>
        {tabs.map((label, index) => (
          <Tab key={index} value={label.value}>
            <TabLabel color={label.color}>{count(label.value)}</TabLabel>
            {label.value}
          </Tab>
        ))}
      </TabsList>
      {/* tab panel? */}
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
      // container that houses the tabs
      // make responsive
      <BaseTabsList
        ref={ref}
        className={clsx(
          'subtitle2 px-6 h-14 rounded-t-2xl border-x border-t border-grey-300 dark:border-grey-700 bg-grey-200 dark:bg-grey-700 flex items-center justify-start content-between gap-10 overflow-scroll',
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
    // tab element itself
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
                ownerState.selected
                  ? 'text-grey-800 bg-transparent border-b border-b-primary border-b-2'
                  : 'text-grey-600 bg-transparent '
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              } w-auto py-2.5 flex-none border-b border-transparent border-b-2`,
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
      <BaseTabPanel ref={ref} className={clsx('px-6', className)} {...other} />
    );
  }
);

TabPanel.displayName = 'TabPanel';
