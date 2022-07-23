import React from 'react';
import AOS from 'aos'
// react component for creating beautiful carousel
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components;
import './style.scss';


import styles from '../../assets/jss/material-kit-react/views/componentsSections/tabsStyle';
import { datAosOnce } from '../../utils/animationsName'


const useStyles = makeStyles(styles);

interface SectionCardsProps {
  heading: string,
  desc: string,
  image: any
}

const WaysCards: React.FC<SectionCardsProps> = ({ heading, desc, image }) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])
  return (
    <div>
      <div className="way-card-container-inside">
        <div className="way-card-container-image">
          <img src={image} />
        </div>

        <h3 className="way-card-text-heading">
          {heading}
        </h3>

        <div className="ways-card-text-desc">
          {desc}
        </div>
      </div>
    </div>
  );
}


export default WaysCards;
