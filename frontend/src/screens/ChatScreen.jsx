import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, ListGroup, Card, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// Ensure this constant exists in your subscriptionConstants.js
import { USE_AI_QUESTION } from '../constants/subscriptionConstants';

const ChatScreen = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your RoofGuard Assistant. How can I help with your roofing or gutter technical questions today?' }
  ]);

  const dispatch = useDispatch();
  const subscription = useSelector(state => state.subscription);
  const { info } = subscription;
  const usage = info?.usage_left || 0;

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim() || usage === 0) return;

    // 1. Add User Message
    const newMessages = [...messages, { role: 'user', text: query }];
    setMessages(newMessages);

    // 2. Logic for AI Response (Mocking the technical answer)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Regarding "${query}": In roofing technical terms, this usually involves checking the flashing and ensuring the drip edge is properly aligned to shed water into the gutters.` 
      }]);
      
      // 3. Decrement usage in Redux
      dispatch({ type: USE_AI_QUESTION });
    }, 1000);

    setQuery('');
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center p-3">
              <h4 className="mb-0">Roofing AI Consultant</h4>
              <Badge bg="light" text="dark" className="p-2">
                Remaining Queries: {usage}
              </Badge>
            </Card.Header>

            <Card.Body className="bg-light" style={{ height: '500px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {messages.map((msg, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className={`border-0 mb-3 bg-transparent d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div 
                      className={`p-3 rounded shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-primary text-white w-75' 
                        : 'bg-white text-dark w-75'
                      }`}
                    >
                      <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
                      <p className="mb-0 mt-1">{msg.text}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>

            <Card.Footer className="bg-white p-3">
              <Form onSubmit={handleSend}>
                <InputGroup size="lg">
                  <Form.Control
                    placeholder={usage > 0 ? "Ask about leak repairs, materials, or DIY..." : "No queries left. Please upgrade tier."}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={usage === 0}
                  />
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={usage === 0 || !query.trim()}
                  >
                    Send
                  </Button>
                </InputGroup>
              </Form>
              {usage === 0 && (
                <div className="text-center mt-2">
                  <small className="text-danger">You have reached your limit. Visit the subscription page for more.</small>
                </div>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatScreen;