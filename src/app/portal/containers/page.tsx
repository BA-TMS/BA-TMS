'use client';
import PortalLayout from '../../components/layouts/portal/PortalLayout';
import { ReactNode, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import "primereact/resources/themes/lara-light-indigo/theme.css";

// TESTING
import Input from '@/app/components/containers-input/Input';
import Form, { type FormHandle } from '@/app/components/containers-input/Form';
import Button from '@/app/components/containers-input/Button';
import { useRef } from 'react';
import Popup from 'reactjs-popup';

const Containers: any = () => {
  const customers = [
    { code: '1', consignee: 'AT&T', address: '424 Yeeter Drive', city: 'Houston', zip: '39450', state: 'Texas', phoneNumber: "(123)456-7890" },
    { code: '2', consignee: 'Walmart', address: '123 Main Street', city: 'New York', zip: '10001', state: 'New York', phoneNumber: "(123)098-7654" },
    { code: '3', consignee: 'Amazon', address: '456 Elm Street', city: 'Los Angeles', zip: '90001', state: 'California', phoneNumber: "(123)123-4567" },
    { code: '4', consignee: 'Google', address: '789 Oak Street', city: 'Chicago', zip: '60601', state: 'Illinois', phoneNumber: "(123)987-6543" },
    { code: '5', consignee: 'Apple', address: '101 Pine Street', city: 'Houston', zip: '39450', state: 'Texas', phoneNumber: "(123)111-2222" },
    { code: '6', consignee: 'Microsoft', address: '202 Cedar Street', city: 'New York', zip: '10001', state: 'New York', phoneNumber: "(123)333-4444" },
    { code: '7', consignee: 'Facebook', address: '303 Maple Street', city: 'Los Angeles', zip: '90001', state: 'California', phoneNumber: "(123)555-6666" },
    { code: '8', consignee: 'Twitter', address: '404 Birch Street', city: 'Chicago', zip: '60601', state: 'Illinois', phoneNumber: "(123)777-8888" },
    { code: '9', consignee: 'Netflix', address: '505 Walnut Street', city: 'Houston', zip: '39450', state: 'Texas', phoneNumber: "(123)999-0000" },
    { code: '10', consignee: 'Uber', address: '606 Spruce Street', city: 'New York', zip: '10001', state: 'New York', phoneNumber: "(123)101-1122" },
    { code: '11', consignee: 'Airbnb', address: '707 Pine Street', city: 'Los Angeles', zip: '90001', state: 'California', phoneNumber: "(123)131-4151" },
    { code: '12', consignee: 'LinkedIn', address: '808 Elm Street', city: 'Chicago', zip: '60601', state: 'Illinois', phoneNumber: "(123)617-2813" },
    { code: '13', consignee: 'Salesforce', address: '909 Oak Street', city: 'Houston', zip: '39450', state: 'Texas', phoneNumber: "(123)192-8374" },
    { code: '14', consignee: 'Oracle', address: '1010 Cedar Street', city: 'New York', zip: '10001', state: 'New York', phoneNumber: "(123)384-7192" },
    { code: '15', consignee: 'IBM', address: '1111 Maple Street', city: 'Los Angeles', zip: '90001', state: 'California', phoneNumber: "(123)947-1928" },
    { code: '16', consignee: 'Intel', address: '1212 Birch Street', city: 'Chicago', zip: '60601', state: 'Illinois', phoneNumber: "(123)819-2736" },
    { code: '17', consignee: 'HP', address: '1313 Walnut Street', city: 'Houston', zip: '39450', state: 'Texas', phoneNumber: "(123)928-3647" },
    { code: '18', consignee: 'Dell', address: '1414 Spruce Street', city: 'New York', zip: '10001', state: 'New York', phoneNumber: "(123)364-7192" },
    { code: '19', consignee: 'Cisco', address: '1515 Pine Street', city: 'Los Angeles', zip: '90001', state: 'California', phoneNumber: "(123)719-2736" },
    { code: '20', consignee: 'Adobe', address: '1616 Elm Street', city: 'Chicago', zip: '60601', state: 'Illinois', phoneNumber: "(123)273-6471" },
    
    /*
    { code: '1', name: 'Jacob Reola', email: 'jacob@a2zport.com', phoneNumber: "(123)456-7890" },
    { code: '2', name: 'Samuel Ortega Gonzalez', email: 'samuel@a2zport', phoneNumber: "(123)098-7654" },
    // Add more products as needed.
    { code: '3', name: 'John Doe', email: 'john@a2zport.com', phoneNumber: "(123)123-4567" },
    { code: '4', name: 'Jane Smith', email: 'jane@a2zport.com', phoneNumber: "(123)987-6543" },
    { code: '5', name: 'Michael Johnson', email: 'michael@a2zport.com', phoneNumber: "(123)111-2222" },
    { code: '6', name: 'Emily Davis', email: 'emily@a2zport.com', phoneNumber: "(123)333-4444" },
    { code: '7', name: 'William Wilson', email: 'william@a2zport.com', phoneNumber: "(123)555-6666" },
    { code: '8', name: 'Olivia Martinez', email: 'olivia@a2zport.com', phoneNumber: "(123)777-8888" },
    { code: '9', name: 'James Anderson', email: 'james@a2zport.com', phoneNumber: "(123)999-0000" },
    { code: '10', name: 'Sophia Taylor', email: 'sophia@a2zport.com', phoneNumber: "(123)101-1122" },
    { code: '11', name: 'Benjamin Thomas', email: 'benjamin@a2zport.com', phoneNumber: "(123)131-4151" },
    { code: '12', name: 'Isabella Garcia', email: 'isabella@a2zport.com', phoneNumber: "(123)617-2813" },
    { code: '13', name: 'Liam Hernandez', email: 'liam@a2zport.com', phoneNumber: "(123)192-8374" },
    { code: '14', name: 'Mia Lopez', email: 'mia@a2zport.com', phoneNumber: "(123)384-7192" },
    { code: '15', name: 'Ethan Gonzalez', email: 'ethan@a2zport.com', phoneNumber: "(123)947-1928" },
    { code: '16', name: 'Ava Perez', email: 'ava@a2zport.com', phoneNumber: "(123)819-2736" },
    { code: '17', name: 'Noah Ramirez', email: 'noah@a2zport.com', phoneNumber: "(123)928-3647" },
    { code: '18', name: 'Emma Torres', email: 'emma@a2zport.com', phoneNumber: "(123)364-7192" },
    { code: '19', name: 'Logan Scott', email: 'logan@a2zport.com', phoneNumber: "(123)719-2736" },
    { code: '20', name: 'Avery Price', email: 'avery@a2zport.com', phoneNumber: "(123)273-6471" },
    */
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
    'consignee': { matchMode: 'contains', value: ''},
    'address': { matchMode: 'contains', value: ''},
    'country': { matchMode: 'contains', value: ''},
    'state': { matchMode: 'contains', value: '' },
    'city': { matchMode: 'contains', value: '' },
    'zip': { matchMode: 'contains', value: '' },
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

  // Need a ref that we connect to our custom component.
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    // Convince TypeScript that we know what the data is.
    const extractedData = data as {
      code: string;
      consignee: string;
      address: string;
      country: string;
      state: string;
      city: string;
      zip: string;
      name: string;
      email:string;
      phoneNumber: string
    };
    console.log(extractedData);
    customForm.current?.clear(); // Current could be null, so add a ?.

    // Add new ID to the new customer and put them at the end of the list.
    // First, convert the last value of 'code' into an int, add 1, then turn it
    // back into a string, then set that as the new ID for the newest customer.
    extractedData.code = String(parseInt(customers[customers.length - 1].code) + 1);
    customers.push(extractedData);
  }

  // Create a Dynamic Country-Region Select Drop down.
  /*
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    // Reset the selected region when a new country is selected
    setSelectedRegion('');
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };*/

  return (
    <PortalLayout pageTitle="Containers">
      <h1>Welcome to the Containers screen</h1>

      {/*<input type="text" onChange={handleInputChange} />*/}
      <Popup trigger= {<button id="modal-button">+Add</button>} modal nested>
        <div id="input-box">
          <h1 id="line-text">New Consignee</h1>
          <Form onSave={handleSave} ref={customForm}>
            <Input type="text" label="Consignee Name" id="consignee" />
            <Input type="text" label="Address" id="address" />

            <div className="flex-container">
              <div className="flex-child">
                <Input type="text" label="Country" id="country" />
              </div>
              <div className="flex-child">
                <Input type="text" label="State" id="state" />
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-child">
                <Input type="text" label="City" id="city" />
              </div>
              <div className="flex-child">
                <Input type="text" label="Postal/Zip" id="zip" />
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-child">
                <Input type="text" label="Name" id="name" />
              </div>
              <div className="flex-child">
                <Input type="email" label="Email" id="email" />
              </div>
            </div>

            <Input type="tel" label="Phone number" id="phoneNumber" />
            <p>
              <Button>Add</Button>
            </p>
          </Form>
        </div>
      </Popup>

      <DataTable value={customers} paginator stripedRows rows={5} dataKey="id" filters={filters}
        filterDisplay='row' loading={loading} globalFilterFields={['code', 'consignee', 'name', 'email', 'phoneNumber']} header={header} emptyMessage="No customers found.">
        <Column field="code" header="ID" filter filterPlaceholder="Search by ID" style={{ width: '14%' }}></Column>
        <Column field='consignee' header="Consignee" filter filterPlaceholder='Search by consignee' style={{ width: '14%' }}></Column>
        <Column field="address" header="Address" filter filterPlaceholder='Search by address' style={{ width: '14%' }}></Column>
        <Column field="city" header="City" filter filterPlaceholder='Search by city' style={{ width: '14%' }}></Column>
        <Column field="zip" header="Postal/Zip" filter filterPlaceholder='Search by zip' style={{ width: '14%' }}></Column>
        <Column field="state" header="State" filter filterPlaceholder='Search by state' style={{ width: '14%' }}></Column>
        <Column field="phoneNumber" header="Phone Number" filter filterPlaceholder="Search by number" style={{ width: '14%' }}></Column>
        {/*
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ width: '17%' }}></Column>
        <Column field="email" header="email" filter filterPlaceholder="Search by email" style={{ width: '17%' }}></Column>
        <Column field="phoneNumber" header="Phone Number" filter filterPlaceholder="Search by number" style={{ width: '17%' }}></Column>
        */}
      </DataTable>
      {/*<Paginator first={0} rows={10} totalRecords={customers.length} rowsPerPageOptions={[5, 10, 20]} onPageChange={(e) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }}></Paginator>*/}
    </PortalLayout>
  );
};

export default Containers;

