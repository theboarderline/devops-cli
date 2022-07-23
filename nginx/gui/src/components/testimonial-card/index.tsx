import React from 'react';
import { Testimonial } from '../../api/types';
import './style.scss';

interface TestimonialCardProps {
  testimonial: Testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="testimonial-card-container">
      <div className="testimonial-card-header">
        <div>
          {testimonial.member_testimonial}
        </div>
      </div>
      <div className="testimonial-image-container">
        {/* <img src={image} className="testimonial-image" /> */}
      </div>
      <div className="testimonial-designation-conatiner">
        <div className="testimonial-designation-heading">
          {testimonial.id}
        </div>
        <div className="testimonial-designation-title">
          {testimonial.short_description}
        </div>
        {/* <a target="_blank" href={website}>
          <div className="testimonial-designation-title">
            {website}
          </div>
        </a> */}
      </div>
    </div>
  )
}

export default TestimonialCard