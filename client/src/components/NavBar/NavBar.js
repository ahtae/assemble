import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div style={{ textAlign: 'start' }}>
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/login" style={{ color: 'black' }}>
                Login
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/register" style={{ color: 'black' }}>
                Register
              </Link>
            </NavItem>
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
    </div>
  );
};

export default NavBar;
