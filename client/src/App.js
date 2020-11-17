import './App.css';
import { Home, Login, Register, EventForm, Events } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import puzzleLogo from './assets/images/puzzle.png';
import NavBar from './components/NavBar/NavBar';
import ContextWrapper from './userContext';

const App = () => {
  return (
    <ContextWrapper>
      <Router>
        <NavBar />
        <h1 id="title">
          assemble{' '}
          <img src={puzzleLogo} alt="puzzle logo" style={{ width: '40px' }} />
        </h1>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />
          <Route path="/event-form" exact component={EventForm} />
          <Route path="/events" exact component={Events} />
        </Switch>
      </Router>
    </ContextWrapper>
  );
};

export default App;
