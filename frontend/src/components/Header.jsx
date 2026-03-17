import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">Roof and Gutter Services</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            {/* Main Navigation Links */}
            <LinkContainer to="/subscriptions">
              <Nav.Link><i className="fas fa-crown me-1"></i>Plans</Nav.Link>
            </LinkContainer>

            {userInfo && (
              <LinkContainer to="/chat">
                <Nav.Link>AI Consultant</Nav.Link>
              </LinkContainer>
            )}

            {userInfo ? (
              <NavDropdown title={`${userInfo.email}`} id="user-menu">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>

                {/* Admin Only Section */}
                {userInfo.is_admin && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>Admin Controls</NavDropdown.Header>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>User Management</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/subscriptions">
                      <NavDropdown.Item>Subscription Transactions</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                {/* Seller Only Section */}
                {userInfo.is_seller && (
                  <>
                    <NavDropdown.Divider />
                    <LinkContainer to="/seller/dashboard">
                      <NavDropdown.Item>Seller Dashboard</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                {/* Non-Seller Section */}
                {!userInfo.is_seller && (
                  <LinkContainer to="/apply-seller">
                    <NavDropdown.Item>Become a Seller</NavDropdown.Item>
                  </LinkContainer>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="auth-menu">
                <LinkContainer to="/login">
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/register">
                  <NavDropdown.Item>Register</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;