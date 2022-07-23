import * as React from 'react';
import { Link } from 'react-router-dom';

import { SwipeableDrawer, List, ListItem, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-kit-react/components/footerStyle';

import './style.scss';
import { LIFECYCLE } from '../../utils';

const useStyles = makeStyles(styles);

interface SideDrawerProps {
  open: boolean,
  isLogin: boolean,
  setOpen: any,
  handleLogout: any
}

const SideDrawer: React.FC<SideDrawerProps> = ({ open, setOpen, isLogin, handleLogout }) => {
  const classes = useStyles();
  return (
    <div className="side-drawer">
      <SwipeableDrawer
        anchor="right"
        open={open}
        className="side-drawer"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className="side-drawer-list">
          <List>
            <Link to='/home' className={classes.block}>
              <MenuItem onClick={() => setOpen(false)}>
                Home
              </MenuItem>
            </Link>
            <Link to='/contact' className={classes.block}>
              <MenuItem onClick={() => setOpen(false)}>
                Contact us
              </MenuItem>
            </Link>
            <Link to='/howwehelp' className={classes.block}>
              <MenuItem onClick={() => setOpen(false)}>
                How we help
              </MenuItem>
            </Link>

            <Link to='/whywehelp' className={classes.block}>
              <MenuItem onClick={() => setOpen(false)}>
                Why we help
              </MenuItem>
            </Link>
            <Link to='/faq' className={classes.block}>
              <MenuItem onClick={() => setOpen(false)}>
                Faq
              </MenuItem>
            </Link>

            {LIFECYCLE !== 'prod' ? (
              <Link to='/testimonials' className={classes.block}>
                <MenuItem onClick={() => setOpen(false)}>
                  Testimonials
                </MenuItem>
              </Link>
            ) : null}

            {isLogin ?
              <div onClick={() => handleLogout()} className={classes.block}>
                Sign Out
              </div>
              :
              null
            }
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default SideDrawer