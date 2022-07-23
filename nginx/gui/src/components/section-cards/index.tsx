import React from 'react';
import AOS from 'aos'
// react component for creating beautiful carousel
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components


import styles from '../../assets/jss/material-kit-react/views/componentsSections/tabsStyle';
import { datAosOnce } from '../../utils/animationsName'


const useStyles = makeStyles(styles);

interface SectionCardsProps {
  heading: string,
  desc: string,
  dataAos: string,
  className?: string,
}

const SectionCards: React.FC<SectionCardsProps> = ({ className, heading, desc, dataAos }) => {
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
    <div style={{ marginBottom: '20px' }} data-aos-once={datAosOnce} data-aos={dataAos} className={`section-card-container section-card-container ${className}`}>
      <div className="section-card-container-inside">
        <div className="section-card-text-heading">
          {heading}
        </div>

        <div className="section-card-text-desc">
          {desc}
        </div>
      </div>
    </div>
  );
}


export default SectionCards;
