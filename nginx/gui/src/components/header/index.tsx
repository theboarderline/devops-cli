import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { FaPhoneAlt } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';

import { socialLogout } from '../../store/actions/auth'
import { gcsBucket } from '../../utils';
import { SideDrawer } from '..';
import './styles.scss';


interface HeaderProps {
  isLogin: boolean,
}

const Header: React.FC<HeaderProps> = ({ isLogin }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(socialLogout())
  }

  return (
    <>
      <AppBar
        position="fixed"
        className="cgs--header"
        classes={{ colorPrimary: 'cgs--header-primary' }}
      >
        <SideDrawer handleLogout={handleLogout} isLogin={isLogin} open={drawerOpen} setOpen={setDrawerOpen} />
        <Toolbar className="cgs--header__toolbar">
          <Link to="/home">
            <img
              height={81}
              width={120}
              src={`${gcsBucket}/cgs.png`}
              alt="N/A"
            />
          </Link>
          <div className="growing-header-container">
            <div className="growing-header-container-left">
              Growing Communities
            </div>
            <div>{'&'}</div>
            <div className="growing-header-container-right">
              Helping Neighbors
            </div>
            {isLogin ? <div className="sign-out-btn" onClick={() => handleLogout()} >Sign Out</div> : null}
          </div>
          <div className="header-free-container feel-free-hover">
            <div>
              Feel free to call
            </div>
            <div className="header-free-phone-container">
              <div className="header-free-phone-container-icon">
                <FaPhoneAlt />
              </div>
              ‪(309) 220-8422‬
            </div>
          </div>
          <div className="mobile-side-menu">
            <div className="openDrawer" onClick={() => setDrawerOpen(true)}>
              <VscThreeBars size={22} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
