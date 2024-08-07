import { ReactElement } from 'react';

// placeholder design element for tables that don't use TableHeaderTabs

export default function TableHeaderBlank(): ReactElement {
  return (
    <div className="px-6 h-8 rounded-t-2xl border-x border-t border-grey-300 dark:border-grey-700 bg-grey-200 dark:bg-grey-700"></div>
  );
}
