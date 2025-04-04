'use client';

import * as React from 'react';
import clsx from 'clsx';
import { SvgIconComponent } from '@mui/icons-material';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList, TabsListProps } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel, TabPanelProps } from '@mui/base/TabPanel';
import { Tab as BaseTab, TabProps } from '@mui/base/Tab';
import NavTabLabel from './NavTabLabel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// this is the MUI tab that acts as navigation
// is styled by TabLabel
// pass an array of objects to generate Tab Labels
// color is the color we want the tab - related to active tab

export interface TabData {
  name: string;
  href: string;
  icon?: SvgIconComponent; // mui icon
}

interface CustomTabsProps {
  tabs: TabData[];
}

const pathToTabMap: { [key: string]: string } = {
  '/settings/profile': 'Profile',
  '/settings/team': 'Team',
  '/settings/password': 'Change Password',
  // Add more paths as needed
};

export function NavTabs({ tabs }: CustomTabsProps) {
  const path = usePathname();

  const [activeTab, setActiveTab] = React.useState<string>('');

  // update the active tab based on current pathname
  React.useEffect(() => {
    const newTab = pathToTabMap[path];

    if (newTab) {
      setActiveTab(newTab);
    }
  }, [path]);

  // const handleTabChange = (
  //   event: React.SyntheticEvent<Element, Event> | null,
  //   newValue: string | number | null
  // ) => {
  //   if (typeof newValue === 'string') {
  //     console.log(newValue);
  //     setActiveTab(newValue);
  //   }
  // };

  return (
    <Tabs
      className="mt-5"
      value={activeTab}
      aria-label="tabs"
      // onChange={handleTabChange} // Callback invoked when new value is being set
    >
      <TabsList>
        {tabs.map((label, index) => {
          return (
            <Link key={index} href={label.href}>
              <Tab value={label.name}>
                <NavTabLabel
                  Icon={label.icon}
                  color={activeTab === label.name ? 'success' : 'default'}
                />
                {label.name}
              </Tab>
            </Link>
          );
        })}
      </TabsList>
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, ref) => {
    const { className, ...other } = props;
    const [isOverflowing, setIsOverflowing] = React.useState({
      left: false,
      right: false,
    });

    const containerRef = React.useRef<HTMLDivElement>(null);

    const currentRef = containerRef.current;

    const checkOverflow = React.useCallback(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setIsOverflowing({
          left: scrollLeft > 0,
          right: scrollLeft + clientWidth < scrollWidth,
        });
      }
    }, []);

    React.useEffect(() => {
      if (currentRef) {
        checkOverflow();
        containerRef.current.addEventListener('scroll', checkOverflow);
        window.addEventListener('resize', checkOverflow);
      }
      return () => {
        if (currentRef) {
          currentRef.removeEventListener('scroll', checkOverflow);
        }
        window.removeEventListener('resize', checkOverflow);
      };
    }, [checkOverflow, currentRef]);

    const scrollLeft = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };
    return (
      // container that houses the tabs
      <div className="relative">
        {isOverflowing.left && (
          <button
            className="absolute left-0 top-0 h-full flex items-center justify-center bg-grey-200 dark:bg-grey-700 rounded-2xl border-grey-300 dark:border-grey-700 z-10"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon />
          </button>
        )}
        <BaseTabsList
          ref={containerRef}
          className={clsx(
            'subtitle2 px-6 h-14 rounded-2xl  border-grey-300 dark:border-grey-700 bg-grey-200 dark:bg-grey-700 flex items-center justify-start content-between gap-10 overflow-hidden',
            className
          )}
          {...other}
        />
        {isOverflowing.right && (
          <button
            className="absolute right-0 top-0 h-full flex items-center justify-center bg-grey-200 dark:bg-grey-700 z-10 rounded-2xl border-grey-300 dark:border-grey-700"
            onClick={scrollRight}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
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
              `subtitle2 flex items-center ${
                ownerState.selected
                  ? 'text-grey-800 bg-transparent border-b border-b-success-dark border-b-2'
                  : 'text-grey-600 bg-transparent'
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
