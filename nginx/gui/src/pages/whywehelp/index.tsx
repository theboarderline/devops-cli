import React from 'react';
import AOS from 'aos';

import { Grid } from '../../components';
import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import './style.scss'
import { fadeDown, fadeRight, fadeZoomOut } from '../../utils/animationsName';
import { GOOGLE_NUMBER } from '../../utils';

interface WhyWeHelpProps {
  check: false
}

const WhyWeHelp: React.FC<WhyWeHelpProps> = () => {

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, []);

  const whywehelpComponent = (
    <div className='lg-rules why-we-help-main-container'>
      <div className="why-we-help-container">
        <div className="contact-us-container-absolute-child"></div>
      </div>
      <div className='lg-rules--header'>Why We Help</div>

      <div data-aos={fadeRight} className="whywe-help-heading">Why Do Homeowners Prefer To Work With Us? We’ll help you discover</div>

      <div data-aos={fadeRight} className="whywe-help-heading-sub">solutions <u>FOR ANY SITUATION</u></div>
      <div data-aos={fadeRight} className="whywe-help-desc">
        Even in a seller’s market, it’s smart to look at your options and see what will actually help you best reach your goals with the sale of your house. While you may be able to get a higher “top line” sales price listing with a local agent, that doesn’t always boil down to more money in your pocket or less headache. That's why we work to provide you multiple solutions to compare your options to solve any problem like:
      </div>

      <ul className="why-we-help-list">
        <li className="why-we-help-list-item">Avoiding Foreclosure</li>
        <li className="why-we-help-list-item">Vacant or Unwanted Property
        </li>
        <li className="why-we-help-list-item">Probated & Inherited Property
        </li>
        <li className="why-we-help-list-item">Divorce</li>
        <li className="why-we-help-list-item">Moving & Relocation</li>
        <li className="why-we-help-list-item">Behind on Mortgage Payments
        </li>
        <li className="why-we-help-list-item">Large Repairs & Liens</li>
        <li className="why-we-help-list-item">Out of State Property
        </li>
        <li className="why-we-help-list-item">Unfortunate Circumstances
        </li>
      </ul>

      <div data-aos={fadeRight} className="why-we-help-yourself">
        See for yourself and get a fair all-cash offer on your house today.
      </div>
      {console.log('GOOGLE_NUMBER', GOOGLE_NUMBER)}
      <div data-aos={fadeRight} className="why-we-help-desc">
        {`Just fill out the short form below or give us a call at ${<strong>{GOOGLE_NUMBER}</strong>} and let’s chat! Our Process is simple and you can close on the date of your choice. You have nothing to lose by getting an offer (no obligations – no pressure). But you could potentially lose thousands of dollars or months of your time by not testing us out and requesting your FREE house offer below.`}
      </div>
    </div>
  );
  return (
    <div className="whyhelp-main-container">
      <Grid
        items={[
          {
            id: 'lg-rules',
            cols: { xs: 12, sm: 8, md: 6, lg: 10 },
            content: whywehelpComponent,
            rows: 1,
          },
        ]}
      />
    </div>
  )
}


export default WhyWeHelp