import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

/* You can style the `TextField` component directly */
const StyledTextField = styled(TextField)({
  borderRadius: '8px',
  border: '1px solid #01C37A',
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

// // will have to pass props for selected day
// // this does not use Tailwind

// export default function DatePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DesktopDatePicker
//         label="date picker"
//         slotProps={{
//           textField: {
//             sx: {
//               borderRadius: '8px',
//               // borderColor: '#DFE3E8 !important',
//               border: '1px solid #DFE3E8 !important',
//             },
//           },
//         }}
//       />
//     </LocalizationProvider>
//   );
// }
