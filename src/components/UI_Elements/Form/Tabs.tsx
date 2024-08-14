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
  const initialTab = children[0].label;
  const [activeTab, setActiveTab] = useState(initialTab); // hold active tab's label
  const handleActiveTab = useCallback(
    (label: unknown) => setActiveTab(label),
    []
  ); // memoized handler for changing active tab

  // dynamically define tabs and content
  const tabs = children.map((child) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleActiveTab(child.props.label);
      }}
      className={
        child.props.label === activeTab
          ? ['tabs__tab', 'tabs__tab-active'].join(' ')
          : 'tabs__tab'
      }
      key={child.props.label}
    >
      {child.props.tabName}
    </button>
  ));

  // iterate children again and only hold child with same label as active tab
  const tabContent = children.filter(
    (child) => child.props.label === activeTab
  );

  return (
    <div>
      <div className="tabs__box">{tabs}</div>
      <div>{tabContent}</div>
    </div>
  );
}

export function Tab({ label, tabName, children }: TabProps) {
  return <>{children}</>;
}
