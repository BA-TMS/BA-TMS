'use client';
import React, { useState } from 'react';
import Input from '../../../../components/Settings-General/Input';
import Button from '../../../../components/Settings-General/Button';
import Iconify from '@/components/iconify/Iconify';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Icon variables
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';

const PasswordReset = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Show/Hide Password variables
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { t: translate } = useTranslation();
    

    const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <Iconify
                icon={`${showOldPassword ? 'mdi:eye' : 'mdi:eye-closed'}`}
                onClick={() => setShowOldPassword(!showOldPassword)}
            />
            <Input
                type={showOldPassword ? "text" : "password"}
                label="Old Password"
                id="oldPassword"
                value={oldPassword}
                onChange={handleOldPassword}
            />
            
            
            <Iconify
                icon={`${showNewPassword ? 'mdi:eye' : 'mdi:eye-closed'}`}
                onClick={() => setShowNewPassword(!showNewPassword)}
            />
            <Input
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
            />
            <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} />{' '}
                {`${translate('Password must contain: At least 8 characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number')}`}
              </Stack>


            
            <Iconify
                icon={`${showConfirmPassword ? 'mdi:eye' : 'mdi:eye-closed'}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <Button onClick={handleResetPassword}>Reset Password</Button>
        </>
    );
};

export default PasswordReset;
