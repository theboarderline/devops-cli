import firebase from 'firebase';
import Api from '../lib/api'

import * as types from './types';

function setIsLoading(isLoading: any) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setTestimonialData(testimonialData: any) {
  return {
    type: types.SET_TESTIMONIAL_DATA,
    testimonialData,
  };
}

export const getTestimonialsData = () => {
  return (dispatch: any) => {
    Api.get('testimonials/')
      .then((resp: any) => {
        console.log('resp');
        return resp;
      })
      .catch((err: any) => {
        console.log('error', err)
      });
  };
};

export const getTestimonialsDatassss = () => {

  return (dispatch: any) => {
    Api.get('testimonials/')
      .then((resp: any) => {
        console.log('resp');
        return resp;
      })
      .catch((err: any) => {
        console.log('error', err)
      });
  };
};
