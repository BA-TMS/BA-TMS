import { useState, useCallback } from 'react';

// interface TabsProps {
//   children: JSX.Element[];
// }

interface TabProps {
  label: string;
  tabName: string;
  children: JSX.Element;
}

export function TabsComponent({ children }) {
  const initialTab = children[0].props.label;
  const [activeTab, setActiveTab] = useState(initialTab);

  // memoized handler for changing active tab
  const handleActiveTab = useCallback(
    (label: unknown) => setActiveTab(label),
    []
  );

  // dynamically define tabs and content
  const tabs = children.map((child: JSX.Element) => (
    <button
      className="subtitle2 text-grey-600 dark:text-grey-200 hover:text-grey-800 dark:hover:text-primary cursor-pointer py-2 border-b-2 border-transparent hover:border-b-2 hover:border-grey-800 dark:hover:border-primary"
      onClick={(e) => {
        e.preventDefault();
        handleActiveTab(child.props.label);
      }}
      //   className={
      //     child.props.label === activeTab
      //       ? ['tabs__tab', 'tabs__tab-active'].join(' ')
      //       : 'tabs__tab'
      //   }
      key={child.props.label}
    >
      {child.props.tabName}
    </button>
  ));

  // iterate children again and only hold child with same label as active tab
  const tabContent = children.filter(
    (child: JSX.Element) => child.props.label === activeTab
  );

  return (
    <>
      <div className="px-6 h-12 bg-grey-200 dark:bg-grey-700 flex items-center justify-start content-between gap-10 overflow-hidden">
        {tabs}
      </div>
      <div>{tabContent}</div>
    </>
  );
}

export function Tab({ label, tabName, children }: TabProps) {
  return <>{children}</>;
}
