import React, { useState } from 'react';
import firebase from '../firebase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const AddImpression = ({ countryCode }) => {
  const [impression, setImpression] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit executed');
    console.log('impression:', impression); // Add this line to log the value of impression
    console.log('countryCode:', countryCode); // Add this line to log the value of countryCode
    if (!impression.trim() || !countryCode) return;
    const newImpression = { word: impression, voteCount: 1 };
    console.log('newImpression:', newImpression); // Add this line to log the newImpression object
    firebase
      .database()
      .ref('impressions/' + countryCode)
      .push(newImpression)
      .then(() => {
        console.log('Impression added successfully'); // Add this line to log a success message
        setImpression('');
      })
      .catch((error) => {
        console.error('Error adding impression:', error); // Add this line to log any errors
      });
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center">
      <TextField
        label="Add impression"
        value={impression}
        onChange={(e) => setImpression(e.target.value)}
        variant="outlined"
        size="small"
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </Box>
  );
};

export default AddImpression;
