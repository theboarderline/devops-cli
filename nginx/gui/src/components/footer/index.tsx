import * as React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import './styles.scss';

const Footer: React.FC = () => {
  return (
    <AppBar position="fixed" className="cgs--header">
      <Toolbar>{/* content */}</Toolbar>
    </AppBar>
  );
};

export default Footer;
