import React from 'react';
import NotFoundError from '../../assets/images/NotFoundError.png';
import './NotFound.css';

const NotFound = () => {
  return (
    <div id="not-found-container">
      <h3>Oops! Page not found!</h3>
      <img id="not-found-image" src={NotFoundError} alt="Not Found" />
    </div>
  );
};

export default NotFound;
