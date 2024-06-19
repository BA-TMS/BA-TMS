import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

// does not use tailwind
// does not handle darkMode
// needs functionality

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'var(--font-publicsans)',
    color: '#919EAB',
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
  '& .MuiFormLabel-root': {
    color: '#919EAB',
    fontFamily: 'var(--font-publicsans)',
  },
});

interface DatePickerProps {
  label: string;
}

export default function DatePicker({ label }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        // value={}
        // onChange={(newValue) => setValue(newValue)}
        label={label}
        slots={{
          textField: StyledTextField,
        }}
      />
    </LocalizationProvider>
  );
}
