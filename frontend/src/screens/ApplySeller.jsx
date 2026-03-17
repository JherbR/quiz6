import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ApplySeller = () => {
  const [license, setLicense] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000'}/api/v1/applications/my/`,
          config
        );
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      }
    };

    if (userInfo) {
      fetchApplications();
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000'}/api/v1/applications/apply/`,
        { business_license: license },
        config
      );

      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 text-center">
      {applications.some(app => app.status === 'Pending') ? (
        <Alert variant="info">You have a pending application. Waiting for Admin approval.</Alert>
      ) : submitted ? (
        <Alert variant="success">Application submitted! Waiting for Admin approval.</Alert>
      ) : (
        <div className="bg-white p-5 shadow rounded">
          <h3>Apply to be a RoofGuard Contractor</h3>
          <p className="text-muted">Grow your roofing business by joining our platform.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler} className="mt-4 text-start">
            <Form.Group className="mb-3">
              <Form.Label>Business License Number</Form.Label>
              <Form.Control
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default ApplySeller;