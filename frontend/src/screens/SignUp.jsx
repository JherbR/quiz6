import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '', username: '', phone_number: '', first_name: '', last_name: '',
    location: '', gender: 'Male', password: '', confirm_password: ''
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
    } else {
      // Dispatch Register Action (Default Role: User)
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Create Account</h2>
          <Form onSubmit={submitHandler} className="bg-light p-4 rounded shadow-sm">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control required onChange={(e) => setFormData({...formData, first_name: e.target.value})} /></Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control required onChange={(e) => setFormData({...formData, last_name: e.target.value})} /></Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control required onChange={(e) => setFormData({...formData, phone_number: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Location</Form.Label><Form.Control placeholder="City, Province" required onChange={(e) => setFormData({...formData, location: e.target.value})} /></Form.Group>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} /></Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3"><Form.Label>Confirm Password</Form.Label><Form.Control type="password" required onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} /></Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 mt-3">Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;