import leftArrow from '../assets/img/left-arr-testi.svg';
import next from '../assets/img/next.svg';
import Left from '../assets/img/Left.svg';
import './style.scss'

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={Left}
      className={className}
      style={onClick !== null ? { ...style, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'rotate(180deg)' } : { ...style, display: 'none', transform: 'rotate(180deg)' }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={Left}
      className={className}
      style={onClick !== null ? {
        ...style, display: 'flex', justifyContent: 'center', alignItems: 'center'
      } : { ...style, display: 'none', }}
      onClick={onClick}
    />
  );
}


const sliderSetting = (slideToShow: number, customArrow: boolean) => {
  if (customArrow) {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: slideToShow,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: slideToShow,
            slidesToScroll: 1,
            infinite: true,
            nextArrow: null,
            prevArrow: null,
          }
        },
      ]
    };
    return settings
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    initialSlide: 0,

  }
  return settings
}


export default sliderSetting