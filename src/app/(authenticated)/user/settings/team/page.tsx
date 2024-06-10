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
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

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

      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Team</h1>
      <br />

      {/* Rounded Toggle */}
      <ToggleButton
        labelText="Require two-step authentication for your team"
        descriptionText="This will require any team member without two-step authentication to enable it the next time they sign in."
      />
      <br />

      {/* Filter */}
      <div>
        <input
          style={{
            width: '300px',
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
                  placeholder="jacob@a2zport.com, joshua@a2zport.com, etc."
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
      <div className="col-span-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6 xl:p-7.5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-title-sm2 font-bold text-black dark:text-white">
                  Leads Report
                </h2>
              </div>
            </div>
          </div>

          <div className="border-b border-stroke px-4 pb-5 dark:border-strokedark md:px-6 xl:px-7.5">
            <div className="flex items-center gap-3">
              <div className="w-2/12 xl:w-3/12">
                <span className="font-medium">Member</span>
              </div>
              <div className="w-6/12 2xsm:w-5/12 md:w-3/12">
                <span className="font-medium">Email Address</span>
              </div>
              <div className="hidden w-4/12 md:block xl:w-3/12">
                <span className="font-medium">Roles</span>
              </div>
              <div className="hidden w-4/12 xl:block">
                <span className="font-medium">Last Login</span>
              </div>
              <div className="hidden w-2/12 text-center 2xsm:block md:w-1/12">
                <span className="font-medium">Actions</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 xl:p-7.5">
            <div className="flex flex-col gap-10">
              {filteredMembers.map((lead, key) => (
                <div className="flex items-center gap-3" key={key}>
                  <div className="w-2/12 xl:w-3/12">
                    <div className="flex items-center gap-4">
                      <span className="hidden font-medium xl:block">
                        {lead.name}
                      </span>
                    </div>
                  </div>
                  <div className="w-6/12 2xsm:w-5/12 md:w-3/12">
                    <span className="font-medium">{lead.email}</span>
                  </div>
                  <div className="hidden w-4/12 md:block xl:w-3/12">
                    <span className="inline-block rounded  py-0.5 px-2.5 text-sm font-medium text-meta-3 bg-meta-3/[0.08]">
                      {lead.role}
                    </span>
                  </div>
                  <div className="hidden w-4/12 xl:block">
                    <span className="font-medium">{lead.lastLogin}</span>
                  </div>
                  <div className="hidden w-2/12 2xsm:block md:w-1/12">
                    <TableActionsPopover></TableActionsPopover>
                    {/*<button className="mx-auto block hover:text-meta-1">*/}
                    {/*</button>*/}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* End Data Table Block */}
    </>
  );
};

export default SettingsPage;
