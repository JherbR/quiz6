import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">Roof and Gutter Services</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/chat">
              <Nav.Link>AI Consultant</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Account" id="adminmenu">
              <LinkContainer to="/seller/dashboard">
                <NavDropdown.Item>Contractor Portal</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/login">
                <NavDropdown.Item>Login</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;