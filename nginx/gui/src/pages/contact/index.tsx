
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AOS from 'aos';

import { Grid, SectionPills } from '../../components';
import { datAosOnce, fadeRight } from '../../utils/animationsName'

import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import phone from '../../assets/img/phonecall.png';
import email from '../../assets/img/email.png'

import './styles.scss';

const Contact: React.FC<RouteComponentProps> = () => {
  const [expanded, setExpanded] = React.useState<string | false>('1');

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])

  const contactComponent = (
    <div className='lg-rules contact-us-container'>
      <div className="contact-us-container-absolute">
        <div className="contact-us-container-absolute-child"></div>
      </div>
      <div className='lg-rules--header contact-us-heading'>Contact Us</div>

      <div data-aos-once={datAosOnce} data-aos={fadeRight} className="helping-neighbor-call-text"  >
        Call Us Today To Get Your Fast & Fair Offer!
      </div>

      <GridContainer>
        <GridItem lg={12}>
          <div data-aos-once={datAosOnce} data-aos={fadeRight} className="helping-neighbor-offers-container">

            <div className="helping-neighbor-offers">
              <div className="helping-neighbor-offers-circle">
              </div>
              <div >
                WE BUY
              </div>
            </div>
            <div className="helping-neighbor-offers">
              <div className="helping-neighbor-offers-circle">
              </div>
              <div>
                ANY HOUSE
              </div>
            </div>
            <div className="helping-neighbor-offers">
              <div className="helping-neighbor-offers-circle">
              </div>

              <div>
                ANY CONDITION
              </div>
            </div>
            <div className="helping-neighbor-offers">
              <div className="helping-neighbor-offers-circle">
              </div>
              <div>
                NO FEES NO HASSLES
              </div>
            </div>

            <div className="helping-neighbor-offers">
              <div className="helping-neighbor-offers-circle">
              </div>
              <div>
                NO OBLIGATION
              </div>
            </div>
            <div className="helping-neighbor-offers">
              <div className="helping-neighbor-offers-circle">
              </div>
              <div>
                JUST SOLUTIONS!
              </div>
            </div>
          </div>
        </GridItem>
        <GridItem lg={12}>
          <div data-aos-once={datAosOnce} className="helping-contact-container">

            <div className="contact-us-icon-container">
              <img className="helping-contact-container-icon" src={phone} />
              <div>
                PHONE: (309) 220-8422
              </div>
            </div>
            <div className="contact-us-icon-container">
              <img className="helping-contact-container-icon" src={email} />
              <div>
                EMAIL: contact@colemangroupsolutions.com
              </div>
            </div>
          </div>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <SectionPills />
        </GridItem>

      </GridContainer>


    </div>
  );

  return (
    <div className="contact-main-container">
      <Grid
        items={[
          {
            id: 'lg-rules',
            cols: { xs: 12, sm: 8, md: 6, lg: 10 },
            content: contactComponent,
            rows: 1,
          },
        ]}
      />
    </div>
  );
};

export default withRouter(Contact);
