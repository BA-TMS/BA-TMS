import { useState, useCallback } from 'react';

interface TabProps {
  children: React.ReactNode;
  label: string;
  tabName: string;
}

export function TabsComponent({
  children,
}: {
  children: React.ReactElement[];
}) {
  const initialTab = children[0].props.label;
  const [activeTab, setActiveTab] = useState(initialTab);

  // memoized handler for changing active tab
  const handleActiveTab = useCallback(
    (label: unknown) => setActiveTab(label),
    []
  );

  // dynamically define tabs and content
  const tabs = children.map((child: JSX.Element) => {
    const isActive = child.props.label === activeTab;

    return (
      <button
        key={child.props.label}
        className={`subtitle2 text-grey-600 dark:text-grey-200 cursor-pointer py-2 border-b-2 ${
          isActive
            ? 'text-grey-800  border-primary'
            : 'border-transparent hover:text-grey-800 hover:border-grey-800 dark:hover:border-grey-200'
        }`}
        onClick={(e) => {
          e.preventDefault();
          handleActiveTab(child.props.label);
        }}
      >
        {child.props.tabName}
      </button>
    );
  });

  // iterate children again and only hold child with same label as active tab
  const tabContent = children.filter(
    (child: JSX.Element) => child.props.label === activeTab
  );

  return (
    <>
      <div className="px-6 h-12 bg-grey-200 dark:bg-grey-900 flex items-center justify-start content-between gap-10 overflow-hidden border-b border-grey-300 dark:border-grey-700">
        {tabs}
      </div>
      <div>{tabContent}</div>
    </>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
