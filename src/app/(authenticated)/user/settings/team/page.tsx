'use client';
import { ReactNode, useState } from 'react';
//import 'primereact/resources/themes/lara-light-indigo/theme.css';

// TESTING
import Input from '../../../../../components/Settings-General/Input';
import Form, { type FormHandle } from '@/components/Settings-General/Form';
import Button from '@/components/Settings-General/Button';
import { useRef } from 'react';
import ToggleButton from '@/components/Controls/ToggleButton';
import Popup from 'reactjs-popup';
import TableActionsPopover from '@/components/UI_Elements/Popovers/TableActions';
import TablePagination from '@/components/UI_Elements/Pagination';
import Table from '@/components/UI_Elements/Table';

type Member = {
  avatar: string;
  name: string;
  email: string;
  role: string;
  authentication: string;
  lastLogin: string;
  status: string;
};

const secondaryNavigation = [
  { name: 'Account', href: '/user/settings', current: true },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
];

type Members = Member[];

const columns = [
  { field: 'name', headerName: 'Member' },
  { field: 'email', headerName: 'Email Address' },
  {
    field: 'role',
    headerName: 'Roles',
    cellRenderer: (role, row) => (
      <span className="inline-block rounded py-0.5 px-2.5 text-sm font-medium text-meta-3 bg-meta-3/[0.08]">
        {role}
      </span>
    ),
  },
  { field: 'lastLogin', headerName: 'Last Login' },
];

const placeholderMembers = [
  {
    avatar: '/images/user/user-17.png',
    name: 'Andrei Statescu',
    email: 'Andrei@a2zport.com',
    role: 'Developer',
    authentication: 'Yes',
    lastLogin: 'Jan 22, 2024, 8:33 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-18.png',
    name: 'Daniel Lepe',
    email: 'Dan@example.com',
    role: 'Manager',
    authentication: 'No',
    lastLogin: 'Feb 15, 2024, 1:45 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-19.png',
    name: 'Jacob Reola',
    email: 'Jacob@example.com',
    role: 'Designer',
    authentication: 'Yes',
    lastLogin: 'Mar 10, 2024, 10:02 AM',
    status: 'lost',
  },
  {
    avatar: '/images/user/user-20.png',
    name: 'Josh Reola',
    email: 'Josh@example.com',
    role: 'Engineer',
    authentication: 'No',
    lastLogin: 'Apr 5, 2024, 12:54 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-21.png',
    name: 'Mrutunjay Singh',
    email: 'Mrutunjay@example.com',
    role: 'Analyst',
    authentication: 'Yes',
    lastLogin: 'May 1, 2024, 5:30 PM',
    status: 'lost',
  },
  {
    avatar: '/images/user/user-22.png',
    name: 'Leonardo Cabral',
    email: 'Leonardo@example.com',
    role: 'Tester',
    authentication: 'No',
    lastLogin: 'Jun 20, 2024, 3:45 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-23.png',
    name: 'example',
    email: 'example@example.com',
    role: 'Tester',
    authentication: 'No',
    lastLogin: 'Jun 16, 2024, 1:40 PM',
    status: 'active',
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
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage with a default value, e.g., 1
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const membersPerPage = 5; // Adjust this number based on your design
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const nameEmailTemplate = (rowData: Member) => (
    <>
      <span style={{ fontWeight: 'bold' }}>{rowData.name}</span>
      <br />
      {rowData.email}
    </>
  );

  // Header for our dataTable.
  const dataTableHeader = () => (
    <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Leads Report</h1>
    </div>
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

  // Set the status of members working on projects.
  const statusBodyTemplate = (member: Member) => {
    return (
      <span
        className={`inline-block rounded  py-0.5 px-2.5 text-sm font-medium ${
          member.status === 'lost'
            ? 'bg-red/[0.08] text-red'
            : 'text-meta-3 bg-meta-3/[0.08]'
        } `}
      >
        {member.status === 'lost' ? 'Lost Lead' : 'Active'}
      </span>
    );
  };

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

    // Give the new member a random status.
    let randomStatus = Math.round(Math.random());
    newMember.status = randomStatus === 0 ? 'lost' : 'active';

    // This code will then add a new member to the Team Members form.
    teamMembers.push(newMember);
    updateFilteredMembers(filterText);
  }

  return (
    <>
      {/* Tabs */}
      <div>
        {/* removed dlassName="border-b border-white/5" */}
        <div>
          {/* Secondary navigation */}
          <nav className="flex overflow-x-auto py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={item.current ? 'text-indigo-400' : ''}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Filter */}
      <div className="rounded-t-lg border border-stroke bg-white dark:border-strokedark dark:bg-black p-6">
        <input
          style={{
            width: '1000px',
            display: 'inline',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
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
          trigger={
            <button
              className="modal-button bg-primary"
              style={{
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                float: 'right',
              }}
            >
              + New Member
            </button>
          }
          modal
          nested
          open={isOpen}
          onOpen={() => setIsOpen(!isOpen)}
        >
          <div
            id="input-box"
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h1
              id="line-text"
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'left',
              }}
            >
              Invite Team Members
            </h1>
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
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: 'black',
                  }}
                  type="text"
                  label="Enter team member email addresses"
                  id="email"
                  placeholder="josh@a2zport.com"
                />
              </div>

              <div>
                <p style={{ fontWeight: 'bold' }}>Select team member Roles</p>
                <input
                  className="text-input"
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: 'black',
                  }}
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
                        {groupRoles.map((role, index) => (
                          <tr key={role + index} className="role">
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
                  <Button
                    className="bg-primary"
                    style={{
                      //backgroundColor: '#3E2F84',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Send Invites
                  </Button>
                </p>
              </div>
            </Form>
            <button
              className="button bg-primary"
              style={{
                //backgroundColor: '#3E2F84',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '1rem',
              }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Popup>
      </div>
      {/* End New Member Block */}

      {/* Data Table Block */}
      <Table
        columns={columns.map((member) => ({
          field: member.field, // Assuming 'field' is a unique identifier for columns
          headerName: member.headerName,
          cellRenderer: member.cellRenderer,
        }))}
        data={filteredMembers}
      />
      {/* End Data Table Block */}
    </>
  );
};

export default SettingsPage;
