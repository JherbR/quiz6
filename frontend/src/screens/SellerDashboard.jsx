import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SellerDashboard = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Seller Dashboard</h1>
          <Card>
            <Card.Body>
              <Card.Title>Manage Your Services</Card.Title>
              <Card.Text>
                Here you can manage your services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SellerDashboard;