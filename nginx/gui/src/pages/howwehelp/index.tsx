import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import AOS from 'aos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Headerflow } from '../../components';

import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import { ABOUT_US } from '../../utils/JSON';
import { datAosOnce, fadeDown, fadeLeft, fadeRight, fadeUp, fadeZoomOut } from '../../utils/animationsName';
import contactusside from '../../assets/img/contactusside.jpg';
import goalImage from '../../assets/img/goalimage.jpg';
import solution from '../../assets/img/solution.jpg';

import './style.scss';

interface HowWeHelpProps {
  check: false
}

const HowWeHelp: React.FC<HowWeHelpProps> = () => {

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])
  const aboutComponent = (
    <div className='lg-rules how-we-help-main-back-container'>
      <div className="how-we-help-container">
        <div className="contact-us-container-absolute-child"></div>
      </div>
      <div className='lg-rules--header'>How We help</div>
      <div data-aos-once={datAosOnce} data-aos={fadeLeft} className="how-we-us-heading">Considering Selling Your Home?
      </div>
      <div data-aos-once={datAosOnce} data-aos={fadeLeft} className="how-we-help-desc">
        Selling to us is stress-free. Here’s some ways we help sellers:
      </div>

      <div className="how-we-help-list-container">
        <ul className="how-we-help-list">
          <li className="how-we-help-list-item">You don’t need to clean up or repair the property
          </li>
          <li className="how-we-help-list-item">You will get paid on your date of choice opposed to 30-60 days
          </li>
          <li className="how-we-help-list-item">We are Flexible & Creative with our solutions so we can solve any situations!
          </li>
        </ul>
      </div>

      <div>
        <GridContainer>
          <GridItem className="show-on-mobile" sm={12} lg={6}>
            <div className="how-we-help-image-item-container mobile-image">
              <img className="how-we-help-image-item" src={contactusside} />
            </div>
          </GridItem>
          <GridItem sm={12} lg={6}>
            <div className="how-we-help-desc-detail">
              We work differently at Coleman Group Solutions. When you contact us and submit the short property information form (below), we’ll <strong> give you a fair all-cash offer on your house within 24 hours… </strong> and the best part is: <strong> we can close whenever YOU choose to close – </strong> it’s entirely up to you.It doesn’t matter what condition the house is in, or even if there are tenants in there that you can’t get rid of… don’t worry about it.We’ll take care of it for you.And if you need the cash quickly, we can close in as little as 7 days because we buy houses with cash and don’t have to rely on traditional bank financing.(Click Here To Learn More About Our Process){'-->***'}How We Help Page***

            </div>
          </GridItem>

          <GridItem className="hide-on-mobile" sm={12} lg={6}>
            <div className="how-we-help-image-item-container how-we-help-first-image">
              <img className="how-we-help-image-item" src={contactusside} />
            </div>
          </GridItem>

          <GridItem order={{ md: 2, lg: 3 }} sm={12} lg={6}>
            <div className="how-we-help-image-item-container">
              <img className="how-we-help-image-item" src={goalImage} />
            </div>
          </GridItem>
          <GridItem sm={12} lg={6}>

            <div className="how-we-help-desc-detail">
              <strong> Our goal is to help make your life easier </strong> and get you out from under the property that’s stressing you out… while still paying a fast, fair, and honest price for your house.<strong> No matter what condition your house is in; no matter what <span><u>situation </u></span> <u> or timeframe you’re facing… </u> </strong>
            </div>
          </GridItem>

          <GridItem className="show-on-mobile" sm={12} lg={6}>
            <div className="how-we-help-image-item-container">
              <img className="how-we-help-image-item" src={solution} />
            </div>
          </GridItem>


          <GridItem sm={12} lg={6}>
            <div className="how-we-help-desc-detail">
              We are a complete solution based service and professional home buyers that are always making it easy for you.Please feel free to reach out to us for assistance on how you can still sell your home even if you have little to no equity, behind on your mortgage, or have large repairs & liens.<strong>We’ll know very quickly if we can help find a solution for you!We’re ready to buy right now!</strong>
            </div>
          </GridItem>
          <GridItem className="hide-on-mobile" sm={12} lg={6}>
            <div className="how-we-help-image-item-container">
              <img className="how-we-help-image-item" src={solution} />
            </div>
          </GridItem>
        </GridContainer>
      </div>

      <div className="how-we-help-content-container">
        {ABOUT_US?.map((question: any) => (
          <Accordion defaultExpanded={true} key={question.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='rules-content'
              id='rules-header'
              className="faq-accordian-header"
            >
              <div className="faq-collapse-header-heading"> {question.question} </div>
            </AccordionSummary>
            <AccordionDetails>
              <div data-aos-once={datAosOnce} data-aos={fadeLeft} > {question.answer} </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>


      {/* <div className="how-we-help-us-call">Call Us Today! (123)456-7890</div> */}
      <div className="how-we-help-footer">
        <GridContainer>
          <GridItem lg={12}>
          </GridItem>
        </GridContainer>
      </div>
    </div >
  );

  return (
    <div className="how-we-help-main-container">
      <Grid
        items={[
          {
            id: 'lg-rules',
            cols: { xs: 12, sm: 8, md: 6, lg: 10 },
            content: aboutComponent,
            rows: 1,
          },
        ]}
      />
    </div>
  )
}

export default HowWeHelp
