import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { ExitToApp } from '@material-ui/icons';

const NavBar = ({ history }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return isLoggedIn ? (
    <div id="nav-bar">
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/event-form" className="nav-link">
                Create Event
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/events" className="nav-link">
                Events
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
        <Button color="danger" onClick={handleLogOutClick}>
          <ExitToApp />
        </Button>
      </Navbar>
    </div>
  ) : null;
};

export default NavBar;
