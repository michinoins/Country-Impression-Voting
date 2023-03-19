import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
    <List>
      {impressions.map((impression) => (
        <ListItem key={impression.key}>
          <ListItemText primary={`${impression.word} (${impression.voteCount})`} />
          <IconButton
            edge="end"
            color="primary"
            onClick={() => handleVote(impression.key, impression.voteCount)}
          >
            <ThumbUpIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ImpressionList;
