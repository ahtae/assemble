import React from 'react';
import './Home.css';
import creativityImage from '../../assets/images/Creativity.svg';
import learningImage from '../../assets/images/Learning Online.svg';
import presentationImage from '../../assets/images/Presentation.svg';
import { Button, ButtonGroup } from 'reactstrap';

const Home = ({ history }) => {
  const handleLoginClick = () => {
    history.push('/login');
  };

  const handleRegisterClick = () => {
    history.push('/register');
  };

  return (
    <div id="home-container">
      <h6 id="home-subheader">Connect through events</h6>
      <div id="home-images">
        <img src={creativityImage} alt="creativityImage" />
        <img src={learningImage} alt="learningImage" />
        <img src={presentationImage} alt="presentationImage" />
      </div>
      <div id="home-buttons">
        <Button
          className="home-btn-custom"
          size="lg"
          onClick={handleLoginClick}
        >
          Login
        </Button>{' '}
        <Button
          className="home-btn-custom"
          size="lg"
          onClick={handleRegisterClick}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Home;
