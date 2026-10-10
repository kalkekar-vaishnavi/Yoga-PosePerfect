import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        <div className="spinner-content">
          <Spinner animation="border" className="custom-spinner" />
          <p className="loading-message">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-spinner-inline">
      <Spinner animation="border" className="custom-spinner" />
      <span className="loading-message">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
