import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterStyled = styled(Box)({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#000',
  color: 'white',
  textAlign: 'center',
  padding: '10px 0',
});

const Footer = () => {
  return (
    <FooterStyled>
      <Typography variant="body1">© 2024 FruitCrypto Admin. All rights reserved.</Typography>
    </FooterStyled>
  );
};

export default Footer;
