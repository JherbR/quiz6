import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '', username: '', phone_number: '', first_name: '', last_name: '',
    location: '', gender: 'Male', password: '', confirm_password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    
    if (!formData.username) {
      setError("Username is required");
      return;
    }
    
    setLoading(true);
    const result = await dispatch(register(
      formData.email, 
      formData.username, 
      formData.password, 
      formData.first_name, 
      formData.last_name, 
      formData.phone_number, 
      formData.location, 
      formData.gender
    ));
    setLoading(false);
    
    if (result?.success) {
      setError('');
      setFormData({ email: '', username: '', phone_number: '', first_name: '', last_name: '', location: '', gender: 'Male', password: '', confirm_password: '' });
      navigate('/login');
    } else {
      setError(result?.error || 'Registration failed');
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Create Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler} className="bg-light p-4 rounded shadow-sm">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control value={formData.first_name} required onChange={(e) => setFormData({...formData, first_name: e.target.value})} /></Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control value={formData.last_name} required onChange={(e) => setFormData({...formData, last_name: e.target.value})} /></Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3"><Form.Label>Username</Form.Label><Form.Control value={formData.username} placeholder="Choose a username" required onChange={(e) => setFormData({...formData, username: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" value={formData.email} required onChange={(e) => setFormData({...formData, email: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control value={formData.phone_number} required onChange={(e) => setFormData({...formData, phone_number: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Location</Form.Label><Form.Control value={formData.location} placeholder="City, Province" required onChange={(e) => setFormData({...formData, location: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" value={formData.password} required onChange={(e) => setFormData({...formData, password: e.target.value})} /></Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3"><Form.Label>Confirm Password</Form.Label><Form.Control type="password" value={formData.confirm_password} required onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} /></Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;