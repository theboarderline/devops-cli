/* eslint-disable */
import * as React from 'react';

import AOS from 'aos';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../kit-components/Footer/Footer';
import { Grid, Headerflow, SectionTabs, NeedToSell } from '../../components';
import { gcsBucket } from '../../utils';
import styles from '../../assets/jss/material-kit-react/views/components';
import { datAosOnce, fadeRight } from '../../utils/animationsName'

import './styles.scss';

const useStyles = makeStyles(styles);

const Home: React.FC<RouteComponentProps> = () => {

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])
  const classes = useStyles();
  const image = `${gcsBucket}/cgs.png`;
  const homeComponent = (
    <div className="cgs--home">
      <div className={`${classes.container} cgs--home-header`}>
        <div className="cgs--home-header-heading">
          Welcome to Coleman Group Solutions!
        </div>
      </div>
      <SectionTabs />

      {/* <Footer /> */}
    </div>
  );
  return (
    <Grid
      items={[
        {
          id: 'cgs--login',
          cols: { xs: 12, sm: 12, md: 12, lg: 12 },
          content: homeComponent,
          rows: 2
        }
      ]}
    />
  );
};

export default withRouter(Home);
