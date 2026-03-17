import React, { useEffect } from 'react';
import { Row, Col, Image, ListGroup, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listServiceDetails } from '../actions/serviceActions';

const DetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { service, loading, error } = useSelector(state => state.serviceDetails);

  useEffect(() => {
    dispatch(listServiceDetails(id));
  }, [dispatch, id]);

  return (
    <div className="mt-4">
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
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
                <h4 className="text-primary font-weight-bold">Price: ${service.price}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" size="lg" className="w-100">Book Appointment</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DetailScreen;