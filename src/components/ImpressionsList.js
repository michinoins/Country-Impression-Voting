import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import {  ListItemText} from '@mui/material';
import { Card, CardContent, Grid, Grow } from '@mui/material';
import { styled, } from '@mui/system';


  
const StyledCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
  }));
  
  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    textAlign: 'center',
  }));
  
  

  



  
  
const ImpressionList = ({ countryCode }) => {
  const [impressions, setImpressions] = useState([]);

  useEffect(() => {
    if (!countryCode) return;
    const ref = firebase.database().ref('impressions/' + countryCode);
    const listener = ref.on('value', (snapshot) => {
      const impressionsData = [];
      snapshot.forEach((childSnapshot) => {
        const impression = childSnapshot.val();
        impression.key = childSnapshot.key;
        impressionsData.push(impression);
      });
      setImpressions(impressionsData.sort((a, b) => b.voteCount - a.voteCount));
    });

    return () => ref.off('value', listener);
  }, [countryCode]);

  const handleVote = (key, voteCount) => {
    const lastVotedTimestamp = localStorage.getItem('lastVoted_' + countryCode);
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000;
  
    if (lastVotedTimestamp && currentTime - lastVotedTimestamp < oneHour) {
      alert('You can vote only once per hour for each country.');
      return;
    }
  
    firebase
      .database()
      .ref('impressions/' + countryCode + '/' + key)
      .update({ voteCount: voteCount + 1 })
      .then(() => {
        localStorage.setItem('lastVoted_' + countryCode, currentTime);
      })
      .catch((error) => console.error('Error updating vote count:', error));
  };

  return (
    <Grid container spacing={2}>
      {impressions.map((impression) => (
        <Grow in={true} key={impression.key}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              onClick={() => handleVote(impression.key, impression.voteCount)}
            >
              <StyledCardContent>
                <ListItemText primary={`${impression.word} (${impression.voteCount})`} />
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grow>
      ))}
    </Grid>
);

  }

export default ImpressionList;
