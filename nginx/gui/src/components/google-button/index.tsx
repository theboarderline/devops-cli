import * as React from 'react';
import GoogleButton from 'react-google-button';
import { CURRENT_URL } from '../../utils';

import './styles.scss';


const GoogleButtonComponent: React.FC = () => {

  return (
    <a href={`${CURRENT_URL}accounts/google/login/?process=login`}>
      <GoogleButton />
    </a>
  );
};

export default GoogleButtonComponent;
