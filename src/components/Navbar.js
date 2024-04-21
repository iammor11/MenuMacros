import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, TextField, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

const Navbar = ({ selectedCountry, setSelectedCountry }) => {
    const router = useRouter();
    const { resturant } = router.query;
    const countries = [
        { label: 'Canada', value: 'ca' }
      ];

      // get the selected country from the url
useEffect(() => {
    // if router query country exists then set the selected country
    // if (router.query.country) {
    //     setSelectedCountry(router.query.country);
    // }
}, []);
  return (
    <AppBar position="static" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }} elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }} onClick={() => router.push('/')}>
        📋 MENU MACROS
        </Typography>
        <TextField
          select
          value={selectedCountry ? selectedCountry : router.query.country}
          onChange={(event) => setSelectedCountry(event.target.value)}
          size="small"
          variant="outlined"
          color="secondary" // Adjusted for better visibility on AppBar
          style={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 4 }}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
