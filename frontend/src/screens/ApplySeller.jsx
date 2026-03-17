import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ApplySeller = () => {
  const [license, setLicense] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Dispatch Apply Action
  };

  return (
    <Container className="mt-5 text-center">
      {submitted ? (
        <Alert variant="info">Application submitted! Waiting for Admin approval.</Alert>
      ) : (
        <div className="bg-white p-5 shadow rounded">
          <h3>Apply to be a RoofGuard Contractor</h3>
          <p className="text-muted">Grow your roofing business by joining our platform.</p>
          <Form onSubmit={submitHandler} className="mt-4 text-start">
            <Form.Group className="mb-3">
              <Form.Label>Business License Number</Form.Label>
              <Form.Control value={license} onChange={(e) => setLicense(e.target.value)} required />
            </Form.Group>
            <Button variant="dark" type="submit">Submit Application</Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default ApplySeller;