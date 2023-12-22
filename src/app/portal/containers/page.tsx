'use client';
import PortalLayout from '../../components/layouts/portal/PortalLayout';
import { ReactNode, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";

const Containers: any = () => {
  const customers = [
    { code: 'P1', name: 'Jacob Reola', email: 'jacob@a2zport.com', phoneNumber: "(123)456-7890" },
    { code: 'P2', name: 'Samuel Ortega Gonzalez', email: 'samuel@a2zport', phoneNumber: "(123)098-7654" },
    // Add more products as needed.
  ]

  // This block of code creates the filter icon that when
  // clicked, you can choose filter options.
  type DataTableFilterMeta = {
    [k: string]: {
      matchMode: 'contains' | 'endsWith' | 'startsWith' | 'equals' | 'notEquals'
        | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom' | 'notContains'
        | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter',
      value: any,
    }
  };

  // These two blocks of code will update the value of the filter input fields
  // when searching for specific elements in the Customers list.
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    'code': { matchMode: 'contains', value: ''},
    'name': { matchMode: 'contains', value: '' },
    'email': { matchMode: 'contains', value: ''},
    'phoneNumber': { matchMode: 'contains', value: ''},
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      'name': { ...prevFilters['name'], value: newValue }
    }));
  }

  // UseState for loading and table header.
  const [loading, setLoading] = useState(false);

  const header = (
    <div className="table-header">
      List of Customers
    </div>
  );

  return (
    <PortalLayout pageTitle="Containers">
      <h1>Welcome to the Containers screen</h1>
      <input type="text" onChange={handleInputChange} />
      <DataTable value={customers} paginator stripedRows rows={10} dataKey="id" filters={filters}
        filterDisplay='row' loading={loading} globalFilterFields={['code', 'name', 'email', 'phoneNumber']} header={header} emptyMessage="No customers found.">
        <Column field="code" header="ID" filter filterPlaceholder="Search by ID" style={{ width: '25%' }}></Column>
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ width: '25%' }}></Column>
        <Column field="email" header="email" filter filterPlaceholder="Search by email" style={{ width: '25%' }}></Column>
        <Column field="phoneNumber" header="Phone Number" filter filterPlaceholder="Search by number" style={{ width: '25%' }}></Column>
      </DataTable>
    </PortalLayout>
  );
};

export default Containers;