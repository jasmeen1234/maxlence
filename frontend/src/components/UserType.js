import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function UserType({role,setRole}) {
  const [userType, setUserType] = React.useState('');
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">UserType</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="userType"
          onChange={handleChange}
        >
          <MenuItem value={"admin"}>Admin
          </MenuItem>
          <MenuItem value={"user"}>User
          </MenuItem>
         
        </Select>
      </FormControl>
    </Box>
  );
}