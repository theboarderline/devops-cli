import * as React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

interface LoaderProps {
  loading: boolean;
}

const LoaderComponent: React.FC<LoaderProps> = ({ loading }) => {
  if (loading)
    return (
      <Loader
        visible
        type="BallTriangle"
        color="#00BFFF"
        height={30}
        width={30}
      />
    );
  return null;
};

export default LoaderComponent;
