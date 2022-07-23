import React from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import { useDispatch } from 'react-redux';

import { Grid, TestimonialCard } from '../../components';
import { getTestimonials } from '../../api';
import { getTestimonialsData } from '../../store/actions/testimonial'
import sliderSetting from '../../utils/utilsFunction';
import { Testimonial } from '../../api/types';

import './style.scss';

interface TestimonialProps {
  check: false
}

const TestimonialComponent: React.FC<TestimonialProps> = () => {

  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    AOS.init({
      duration: 2000
    });

    getTestimonials()
      .then((results: Testimonial[]) => {
        console.log('testimonials:', results)
        setTestimonials(results);
      });

    dispatch(getTestimonialsData())
  }, []);

  const testimonialComponent = (
    <div className='lg-rules testimonial-header-main-container'>
      <div className="testimonial-header-container">
        <div className="contact-us-container-absolute-child"></div>
      </div>
      <div className='lg-rules--header'>Testimonials</div>
      <div className="testimonial-background" >
        <div className="testimonial-background-width">
          <Slider {...sliderSetting(1, true)}>
            {testimonials?.map(item => {
              return (
                <TestimonialCard
                  testimonial={item}
                />
              )
            })}
          </Slider>
        </div>
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
            content: testimonialComponent,
            rows: 1,
          },
        ]}
      />
    </div>
  )
};


export default TestimonialComponent
