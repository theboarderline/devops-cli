/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from 'classnames';
// material-ui core components
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import styles from '../../assets/jss/material-kit-react/components/footerStyle';

import './style.scss'

const useStyles = makeStyles(styles);

export default function Footer(props: any) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div >
          <List className="footer-item-container">
            <ListItem className="footer-list-item-contaienr">
              Coleman Group Solutions
            </ListItem>
            <ListItem className="footer-list-item-contaienr">
              <Link to='/about' >
                About us
              </Link>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
