import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ServiceCard = ({ service }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-sm border-0">
      <Card.Img src={service.sample_image} variant="top" style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title as="div">
          <strong>{service.service_name}</strong>
        </Card.Title>
        <Card.Text as="div" className="my-2 text-muted">
          {service.description.substring(0, 60)}...
        </Card.Text>
        <Card.Text as="h5" className="text-primary">
          ${service.price}
        </Card.Text>
        <LinkContainer to={`/service/${service.id}`}>
          <Button variant="outline-primary" className="w-100 mt-2">View Details</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;