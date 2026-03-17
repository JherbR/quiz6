import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

const tiers = [
  { name: 'Basic', price: '9.99', questions: 3, color: 'info' },
  { name: 'Standard', price: '19.99', questions: 5, color: 'primary' },
  { name: 'Premium', price: '29.99', questions: 10, color: 'dark' },
];

const SubscriptionScreen = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">RoofGuard AI Consultant Tiers</h2>
      <Row>
        {tiers.map((tier) => (
          <Col md={4} key={tier.name}>
            <Card className="text-center shadow mb-4">
              <Card.Header className={`bg-${tier.color} text-white`}>
                <h4 className="my-0">{tier.name}</h4>
              </Card.Header>
              <Card.Body>
                <h1 className="card-title">${tier.price} <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>{tier.questions} AI Technical Inquiries</li>
                  <li>DIY Maintenance Guides</li>
                  <li>Priority Support</li>
                </ul>
                <Button variant={`outline-${tier.color}`} className="w-100">Subscribe via PayPal</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubscriptionScreen;