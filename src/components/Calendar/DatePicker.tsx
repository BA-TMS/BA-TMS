import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

// does not use tailwind
// does not handle darkMode

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#919EAB', // there seems to be some transparency
    fontSize: '16px',
    lineHeight: '24px',
    height: '56px',

    '& fieldset': {
      borderColor: '#DFE3E8',
      borderRadius: '8px',
    },
    '&:hover fieldset': {
      borderColor: '#DFE3E8',
    },
    '&.Mui-focused fieldset': {
      outline: 'none',
      border: '1px solid #DFE3E8',
    },
  },
});

export default function DatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        slots={{
          textField: StyledTextField,
        }}
      />
    </LocalizationProvider>
  );
}
