import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../userContext';

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <div style={{ textAlign: 'start' }}>
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/event-form" style={{ color: 'black' }}>
                Create Event
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/events" style={{ color: 'black' }}>
                Events
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <p onClick={handleLogOutClick}>Log out</p>
    </div>
  ) : null;
};

export default NavBar;
