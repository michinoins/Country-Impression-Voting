import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#333',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%'
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: theme.typography.fontWeightBold,
  marginLeft: '1%',
}));
const theme = createTheme();

const Header = () => (
    <ThemeProvider theme={theme}>

  <StyledAppBar position="static">
    <Toolbar>
      <Title variant="h6">
        Country Impression
      </Title>
    </Toolbar>
  </StyledAppBar>
  </ThemeProvider>
);

export default Header;
