import React, { useEffect, useState } from 'react';
import { Row, Col, Image, ListGroup, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listServiceDetails } from '../actions/serviceActions';
import PayPalButton from '../components/PayPalButton';

const DetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.userLogin);
  const { service, loading, error } = useSelector(state => state.serviceDetails);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    dispatch(listServiceDetails(id));
  }, [dispatch, id]);

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    navigate('/');
  };

  return (
    <div className="mt-4">
      {loading ? <p>Loading...</p> : error ? <p className="text-danger">{error}</p> : (
        <Row>
          <Col md={6}>
            <Image src={service.sample_image} alt={service.service_name} fluid rounded shadow />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{service.service_name}</h3>
                <Badge bg="info">{service.duration_of_service} Estimated Hours</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="text-muted">
                {service.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="text-primary font-weight-bold">Price: ${service.price}</h4>
                  <Badge bg="warning" text="dark">★ {service.rating || 'N/A'}</Badge>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Expert:</strong> {service.seller_name || 'Unknown'}
              </ListGroup.Item>
              <ListGroup.Item>
                {userInfo ? (
                  showPayment ? (
                    <div>
                      <h5 className="mb-3">Complete Your Payment</h5>
                      <PayPalButton service={service} onSuccess={handlePaymentSuccess} />
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => setShowPayment(true)}
                    >
                      Book & Pay Now
                    </button>
                  )
                ) : (
                  <p className="text-warning">Please <a href="/login">login</a> to book this service.</p>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DetailScreen;