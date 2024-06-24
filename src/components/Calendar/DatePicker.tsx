import React, { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

import dayjs from 'dayjs';

// does not use tailwind
// does not handle darkMode

// pass this component a function from parent component to update parent's state

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
    '&.Mui-focused': {
      color: '#919EAB',
    },
  },
});

interface DatePickerProps {
  label: string;
  date: dayjs.Dayjs | null;
  handleChange: (arg: dayjs.Dayjs | null) => void;
}

export default function DatePicker({
  label,
  date,
  handleChange,
}: DatePickerProps) {
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(date);

  // updates the value state whenever the date prop changes
  // ensures that DatePicker stays in sync with the parent component's state
  useEffect(() => {
    setValue(date);
    console.log('date', date);
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        className="dark:bg-grey-800"
        value={value}
        onChange={(newValue) => {
          console.log('new value', newValue);
          setValue(newValue);
          handleChange(newValue);
        }}
        label={label}
        slots={{
          textField: StyledTextField,
        }}
      />
    </LocalizationProvider>
  );
}
