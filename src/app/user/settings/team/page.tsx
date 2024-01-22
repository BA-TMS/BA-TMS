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
import ToggleButton from '@/components/Controls/ToggleButton';

const SettingsPage = () => {
  const teamMembers = [
    {
      member: 'string',
      email: 'string',
      role: 'string',
      authentication: 'string',
      lastLogin: 'string',
    },
  ];

  // Need a ref that we connect to our custom component.
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    // Convince TypeScript that we know what the data is.
    const extractedData = data as {
      member: string;
      email: string;
      role: string;
      authentication: string;
      lastLogin: string;
    };
    console.log(extractedData);
    customForm.current?.clear(); // Current could be null, so add a ?.

    // This code will then add a new member to the Team Members form.
    teamMembers.push(extractedData);
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
    </>
  );
};

export default SettingsPage;
