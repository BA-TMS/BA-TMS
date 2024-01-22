'use client';
import { ReactNode, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

// TESTING
import Input from '../../../../components/Settings-General/Input';
import Form, {
  type FormHandle,
} from '../../../../components/Settings-General/Form';
import Button from '../../../../components/Settings-General/Button';
import { useRef } from 'react';
import Switch from 'react-switch';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ToggleButton from '@/components/Controls/ToggleButton';

type Member = {
  name: string;
  email: string;
  role: string;
  authentication: string;
  lastLogin: string;
};

type Members = Member[];

const placeholderMembers = [
  {
    name: 'Dude',
    email: 'samuel@a2zport.com',
    role: 'Developer',
    authentication: 'Yes',
    lastLogin: 'January 22, 2024',
  },
  {
    name: 'John',
    email: 'john@example.com',
    role: 'Manager',
    authentication: 'No',
    lastLogin: 'February 15, 2024',
  },
  {
    name: 'Alice',
    email: 'alice@example.com',
    role: 'Designer',
    authentication: 'Yes',
    lastLogin: 'March 10, 2024',
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    role: 'Engineer',
    authentication: 'No',
    lastLogin: 'April 5, 2024',
  },
  {
    name: 'Eve',
    email: 'eve@example.com',
    role: 'Analyst',
    authentication: 'Yes',
    lastLogin: 'May 1, 2024',
  },
  {
    name: 'Grace',
    email: 'grace@example.com',
    role: 'Tester',
    authentication: 'No',
    lastLogin: 'June 20, 2024',
  },
  {
    name: 'example',
    email: 'example@example.com',
    role: 'Tester',
    authentication: 'No',
    lastLogin: 'June 16, 2024',
  },
];

const SettingsPage = () => {
  const teamMembers: Members = placeholderMembers;

  // Need a ref that we connect to our custom component.
  const customForm = useRef<FormHandle>(null);

  // State for filter.
  const [filteredMembers, setFilteredMembers] = useState<Members>(teamMembers);

  /* DATATABLE TESTING */

  const nameEmailTemplate = (rowData: Member) => (
    <>
      <span style={{ fontWeight: 'bold' }}>{rowData.name}</span>
      <br />
      {rowData.email}
    </>
  );

  /* END TESTING */

  function handleSave(data: Member) {
    // Convince TypeScript that we know what the data is.
    console.log(data);
    customForm.current?.clear(); // Current could be null, so add a ?.

    // This code will then add a new member to the Team Members form.
    teamMembers.push(data);
  }

  return (
    <>
      <p>Setting &gt; Team</p>
      <br />
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Team</h1>
      <br />

      {/* Rounded Toggle */}
      <ToggleButton
        labelText="Require two-step authentication for your team"
        descriptionText="This will require any team member without two-step authentication to enable it the next time they sign in."
      />
      <br />
      <ToggleButton
        labelText="Hide support messages for non-Administrator users"
        descriptionText="This will prevent non-Administrator users from viewing support messages for your account."
      />
      <br />
      <br />

      {/* Filter */}
      <div>
        <input
          type="text"
          placeholder="Filter by name or email..."
          onChange={(e) => {
            const value = e.target.value;
            // Filter the team members based on the input value
            const filteredMembers = teamMembers.filter(
              (member) =>
                member.name.toLowerCase().includes(value.toLowerCase()) ||
                member.email.toLowerCase().includes(value.toLowerCase())
            );
            // Update the team members list with the filtered results
            // (Assuming you have a state variable to store the filtered members)
            setFilteredMembers(filteredMembers);
          }}
        />
      </div>
      <div>
        <DataTable
          value={filteredMembers}
          paginator
          stripedRows
          rows={5}
          dataKey="id"
          emptyMessage="No members found."
          footer={filteredMembers.length + ' members'}
        >
          <Column
            body={nameEmailTemplate}
            header="Member"
            style={{ width: '20%' }}
          ></Column>
          <Column field="role" header="Roles" style={{ width: '20%' }}></Column>
          <Column
            field="authentication"
            header="Authentication"
            style={{ width: '20%' }}
          ></Column>
          <Column
            field="lastLogin"
            header="Last Login"
            style={{ width: '20%' }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default SettingsPage;
