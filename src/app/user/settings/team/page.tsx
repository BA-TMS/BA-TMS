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
import Iconify from '@/components/iconify/Iconify';
import Popup from 'reactjs-popup';

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

type RoleGroups = {
  [key: string]: string[];
};

const roleGroups: RoleGroups = {
  'Admin roles': ['Administrator', 'IAM Admin'],
  'Developer roles': ['Developer'],
  'Other roles': ['Top-up Specialist'],
};

const SettingsPage = () => {
  const teamMembers: Members = placeholderMembers;

  // Need a ref that we connect to our custom component.
  const customForm = useRef<FormHandle>(null);

  const [filteredMembers, setFilteredMembers] = useState<Members>(teamMembers);
  const [filteredRoleGroups, setFilteredRoleGroups] = useState(roleGroups);
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const nameEmailTemplate = (rowData: Member) => (
    <>
      <span style={{ fontWeight: 'bold' }}>{rowData.name}</span>
      <br />
      {rowData.email}
    </>
  );

  function updateFilteredMembers(filter: string) {
    const filteredMembers = teamMembers.filter(
      (member) =>
        member.name?.toLowerCase().includes(filter.toLowerCase()) ||
        member.email?.toLowerCase().includes(filter.toLowerCase())
    );
    // Update the team members list with the filtered results
    // (Assuming you have a state variable to store the filtered members)
    setFilteredMembers(filteredMembers);
  }

  function handleSave(data: unknown) {
    const newMember = data as Member;

    // Convince TypeScript that we know what the data is.
    console.log(data);
    customForm.current?.clear(); // Current could be null, so add a ?.

    // First, check if user left the email input field empty.
    if (newMember.email === '' || newMember.role === undefined) {
      return;
    }

    // Prevent duplicate emails. Without this, an error occurs when entering a duplicate email.
    for (let i = 0; i < teamMembers.length; i++) {
      if (teamMembers[i].email === newMember.email) {
        alert(
          'You cannot have more than one of the same email. Please change it.'
        );
        return;
      }
    }

    // Success! The email is not null. Add a name for the email.
    const memberName = newMember.email.substring(
      0,
      newMember.email.indexOf('@')
    );
    // Get the name of the new member and uppercase the first letter.
    newMember.name = memberName;
    newMember.name = newMember.name[0].toUpperCase() + newMember.name.slice(1);

    // This code will then add a new member to the Team Members form.
    teamMembers.push(newMember);
    updateFilteredMembers(filterText);
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
          style={{ width: '300px', display: 'inline' }}
          type="text"
          placeholder="Filter by name or email..."
          className="text-input"
          onChange={(e) => {
            const value = e.target.value;
            setFilterText(value);
            updateFilteredMembers(value);
          }}
        />

        {/* End Filter Block */}

        {/* New Member Block */}
        <Popup
          trigger={<button className="modal-button">+ New Member</button>}
          modal
          nested
          open={isOpen}
          onOpen={() => setIsOpen(!isOpen)}
        >
          <div id="input-box">
            <h1 id="line-text">Invite Team Members</h1>
            <br />
            <br />

            <Form
              onSave={(data) => {
                handleSave(data);
                setIsOpen(false);
              }}
              ref={customForm}
            >
              <div>
                <Input
                  required
                  className="text-input"
                  type="text"
                  label="Enter team member email addresses"
                  id="email"
                  placeholder="jacob@a2zport.com, joshua@a2zport.com, etc."
                />
              </div>

              <div>
                <p style={{ fontWeight: 'bold' }}>Select team member Roles</p>
                <input
                  className="text-input"
                  placeholder="Search by role..."
                  onChange={
                    (e) => {
                      const value = e.target.value;

                      // Filter the roles based on the input value
                      const filteredRoleGroups: RoleGroups = {};

                      for (const key in roleGroups) {
                        const roles = roleGroups[key];

                        const filteredRoles = roles.filter((role) =>
                          role.toLowerCase().includes(value.toLowerCase())
                        );

                        if (filteredRoles.length > 0)
                          filteredRoleGroups[key] = filteredRoles;
                      }

                      setFilteredRoleGroups(filteredRoleGroups);
                    }
                    // Update the roles list with filtered results
                    // (Assuming you have a state variable to store the filtered groups)
                  }
                ></input>
              </div>

              <table>
                <tbody>
                  {Object.entries(filteredRoleGroups).map((group) => {
                    const groupName = group[0];
                    const groupRoles = group[1];

                    return (
                      <>
                        <tr className="group-header">
                          <td>
                            <span
                              className="error2"
                              style={{ display: 'inline' }}
                            >
                              {groupName}
                            </span>
                          </td>
                        </tr>
                        {groupRoles.map((role) => (
                          <tr className="role">
                            <td>
                              <input
                                required
                                className="checkbox-input"
                                name="role"
                                type="radio"
                                value={role}
                                style={{ display: 'inline' }}
                              />
                              <span>{role}</span>
                            </td>
                          </tr>
                        ))}
                      </>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ display: 'flex', float: 'left' }}>
                <p>
                  <Button>Send Invites</Button>
                </p>
              </div>
            </Form>
            <button
              className="button"
              style={{ marginLeft: '1rem' }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Popup>
      </div>
      {/* End New Member Block */}

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
