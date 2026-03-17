import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import ServiceCard from '../components/ServiceCard';
import { listServices } from '../actions/serviceActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Pulling data from Redux State
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch]);

  return (
    <Container>
      <div className="py-4">
        <h1 className="text-uppercase fw-bold">Expert Roofing & Gutter Services</h1>
        <p className="text-muted">Reliable repairs, installations, and maintenance for your home.</p>
        <hr className="my-4" />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading Services...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">
          {error}
        </Alert>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service.id} sm={12} md={6} lg={4} xl={3}>
              <ServiceCard service={service} />
            </Col>
          ))}
          
          {/* Fallback if no services are returned from the API yet */}
          {services.length === 0 && (
            <Col>
              <p className="text-center py-5">No roofing services found at the moment.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;