import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';

import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import SectionCards from '../section-cards';
import SellerForm from '../../forms/seller-form';
import { NeedToSell, WaysCard } from '..'

import styles from '../../assets/jss/material-kit-react/views/componentsSections/tabsStyle';
import { fadeUp } from '../../utils/animationsName'

import './style.scss';
import contact from '../../assets/img/contactus.jpeg';
import discuss from '../../assets/img/discuss.jpeg';
import high from '../../assets/img/high.png';
import simplesystem from '../../assets/img/simplesystem.jpg';

const useStyles = makeStyles(styles);


export default function SectionTabs() {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])

  return (
    <div>
      <div>
        <div id='nav-tabs'>
          <GridContainer  >
            <GridItem xs={12} sm={12} md={12}>
              <GridItem xs={12} sm={12} md={12}>
                <SellerForm />
              </GridItem>
              <div className={`${classes.section} section-tab-header`}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem xs={12}>
                      <div className="nav-tabs-desc">
                        We purchase properties at any price and any condition
                      </div>
                      <div className="nav-tabs-desc">
                        Want to discover how our process works? Make sure to sign in and submit an inquiry above!
                      </div>
                      <div className="nav-tabs-desc">
                        We’re prepared with solutions and are ready to give you a fair offer for your property
                      </div>
                    </GridItem>
                    <GridItem className="section-card-grid-container" xs={12} sm={12} md={6} lg={4}>
                      <SectionCards
                        dataAos={fadeUp}
                        heading="1. Contact"
                        className={'section-card-1'}
                        desc="Tell us about your property so we can do research to provide as many options as possible!"
                      />
                    </GridItem>
                    <GridItem className="section-card-grid-container" xs={12} sm={12} md={6} lg={4}>
                      <SectionCards
                        dataAos={fadeUp}
                        heading="2. Discuss"
                        className={'section-card-2'}
                        desc="We’ll  present multiple solutions tailored to give you a fair offer!"
                      />
                    </GridItem>

                    <GridItem className="section-card-grid-container" xs={12} sm={12} md={6} lg={4}>
                      <SectionCards
                        dataAos={fadeUp}
                        heading="3. Craft Solution"
                        className={'section-card-3'}
                        desc=" Get paid cash in your pocket on your date of choice!"
                      />
                    </GridItem>

                    <NeedToSell />

                    <GridItem lg={4}  >
                      <WaysCard image={high} desc="If you just want to be done with your property in Chicago, we understand. We buy houses and it is our goal to show you how easy selling a house can be, on your timeline! So if you've been thinking, 'I need to sell my house fast in Chicago, IL,' we know we have the ability to include you as another satisfied customer." heading="Want To Sell Your House For Money Fast in Chicago?" />
                    </GridItem>
                    <GridItem lg={4}  >
                      <WaysCard image={simplesystem} desc="We offer you a sure way to sell your house quickly regardless of the type of property you are selling. We buy Chicago & Illinois houses As Is so you don't have to pay for repairs or do back breaking clean outs. Our Sell-My-House-Fast-Process is designed to serve the needs of sellers. Bottom line, we buy houses fast, for cash, and with a high level of professionalism ." heading="The Fast Way To Sell Your House If It Needs Work" />
                    </GridItem>
                    <GridItem lg={4}  >
                      <WaysCard image={simplesystem} desc="Have you tried to list a house with a real-estate agent and it won't sell fast? We buy ugly houses Chicago. Don't waste precious time. We quickly know if your property is a good fit or not. We buy houses Chicago...And we can buy yours." heading='Sell Your House "As Is" in a Matter of Days' />
                    </GridItem>
                  </GridContainer>
                </div>
              </div>

            </GridItem>

          </GridContainer>
        </div>
      </div>
    </div>
  );
}
