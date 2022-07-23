import React from 'react';
import AOS from 'aos';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Schedule from '@material-ui/icons/Schedule';
import Settings from '@material-ui/icons/Settings';
import List from '@material-ui/icons/List';
import { ABOUT_US } from '../../utils/JSON'

// core components
import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import NavPills from '../../kit-components/NavPills/NavPills';

import styles from '../../assets/jss/material-kit-react/views/componentsSections/pillsStyle';
import { fadeZoomOut, datAosOnce } from '../../utils/animationsName';
import './style.scss';

const useStyles = makeStyles(styles);

export default function SectionPills() {
  const classes = useStyles();
  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])
  return (
    <div >
      <div id='navigation-pills'>
        <GridContainer className="navigation-side-tabs">

          <div data-aos-once={datAosOnce} data-aos={fadeZoomOut} className="navigation-pills-container">
            <div className="navigation-pills-heading">
              <u>SELL YOUR PROPERTY NO MATTER THE SITUATION</u>
            </div>
            <div className="navigation-pills-container-purchase-text">
              We Purchase Properties at Any Price and in Any Condition
            </div>
          </div>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <NavPills
              color='rose'

              horizontal={{
                tabsGrid: { xs: 12, sm: 4, md: 2 },
                contentGrid: { xs: 12, sm: 8, md: 8 },
              }}
              tabs={[
                {
                  tabButton: 'Can we Help',
                  tabIcon: Dashboard,
                  tabContent: (
                    <div>
                      <ol>
                        <li className="tab-text-data">
                          Are You In <strong>Foreclosure</strong> or Are About To Be?
                        </li>
                        <li className="tab-text-data">
                          Do You Own <strong>Unwanted Rental Property?</strong>
                        </li>
                        <li className="tab-text-data">
                          Do You Have Frustrating Tenants (Or Family Members) That You Can’t Get Rid Of?
                        </li>
                        <li className="tab-text-data">
                          Do You Own A <strong>Vacant Property</strong>?
                        </li>
                        <li className="tab-text-data">
                          Did You <strong>Inherit An Unwanted Property?</strong>
                        </li>
                        <li className="tab-text-data">
                          Do You Need To <strong>Relocate Quickly</strong> And Need To Sell Your Current House Fast?
                          Do You Want To <strong>Avoid Paying Realtor Commissions</strong>?
                        </li>
                        <li className="tab-text-data">
                          Are You Going Through A <strong>Divorce</strong>?
                        </li>
                        <li className="tab-text-data">
                          Do You <strong>Have Little Or No Equity</strong> And Need To Sell?
                        </li>
                        <li className="tab-text-data">
                          Do You Own A “Fixer Upper” That You Don’t Want To Fix Up Or Don’t Have Time To Fix Up?

                        </li>
                      </ol>
                    </div>
                  ),
                },
                {
                  tabButton: 'How We Help',
                  tabIcon: Settings,
                  tabContent: (
                    <ol>
                      {ABOUT_US.map(item => {
                        return (
                          <li style={{ marginBottom: '4px' }} key={item.id}>
                            <strong>{item.question}</strong>
                            {' '}
                            {item.answer}
                          </li>
                        )
                      })}
                    </ol>
                  ),
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
