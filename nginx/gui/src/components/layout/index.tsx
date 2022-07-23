import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Header, Headerflow } from '..';
import { socialLogin } from '../../store/actions/auth'

import './styles.scss';

const Layout: React.FC = ({ children }) => {
  const history = useHistory();
  const [count, setCount] = React.useState(0);
  const [isLogin, setIsLogin] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState(Object);
  const dispatch = useDispatch();



  React.useEffect(() => {
    dispatch(socialLogin());
  }, []);

  React.useEffect(() => {
    setCount(count + 1)
  }, [history.location.pathname]);

  return (
    <div className="layout-main-container" >
      <Header isLogin={isLogin} />
      <div style={{ marginTop: 70 }}>
        <Headerflow check={true} />
      </div>
      <div className="cgs--layout">{children}</div>
    </div>
  );
};

export default Layout;
