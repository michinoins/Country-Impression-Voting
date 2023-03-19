import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CountrySelect = ({ countries, selectedCountryCode, setSelectedCountryCode }) => {
  const handleChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 240 }}>
      <InputLabel id="country-select-label">Select a country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={selectedCountryCode}
        onChange={handleChange}
        label="Select a country"
      >
        {countries.map((country) => (
          <MenuItem key={country.cca2} value={country.cca2}>
            <img
              src={country.flags.svg}
              alt={country.name.common}
              style={{ width: '20px', marginRight: '8px' }}
            />
            {country.name.common}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelect;
