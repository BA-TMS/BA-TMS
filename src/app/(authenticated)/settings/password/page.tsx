'use client';
import React, { useState } from 'react';

const PasswordReset = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Show/Hide Password variables
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    // Add logic to reset password
    if (newPassword === confirmPassword) {
      // Call API to reset password
      console.log('Password reset successful');
    } else {
      console.error('Passwords do not match');
    }
  };

  // Show/Hide Password

  return (
    <>
      <h2>Reset Password Page</h2>
      <input
        type={showOldPassword ? 'text' : 'password'}
        id="oldPassword"
        value={oldPassword}
        onChange={handleOldPassword}
      />

      <input
        type={showNewPassword ? 'text' : 'password'}
        id="newPassword"
        value={newPassword}
        onChange={handlePasswordChange}
      />

      <input
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </>
  );
};

export default PasswordReset;
