import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const AppBarStyled = styled(AppBar)({
  marginBottom: '20px',
  backgroundColor: '#000',
  color: '#fff',
});

const Navbar = () => {
  return (
    <AppBarStyled position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          FruitCrypto Admin
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/tasks">
          Task
        </Button>
        <Button color="inherit" component={Link} to="/referrals">
          Referrals
        </Button>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Navbar;
