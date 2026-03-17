import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listSubscriptionTiers, subscribeToTier, getMySubscription } from '../actions/subscriptionActions';
import { PayPalButtons } from '@paypal/react-paypal-js';

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const { tiers, loading: loadingTiers, error: tierError } = useSelector(state => state.subscriptionTiers);
  const { info, loading: loadingSub, error: subError, subscribing } = useSelector(state => state.subscription);
  const { userInfo } = useSelector(state => state.userLogin);

  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    dispatch(listSubscriptionTiers());
    if (userInfo) dispatch(getMySubscription());
  }, [dispatch, userInfo]);

  const handleSubscribe = async (tier) => {
    // Payment will happen in the PayPal button flow
    setSelectedTier(tier);
  };

  const handleSubscriptionSuccess = async (details) => {
    if (!selectedTier) return;
    const result = await dispatch(subscribeToTier(selectedTier.id));
    if (result.success) {
      setSelectedTier(null);
      alert('Subscription activated!');
    } else {
      alert('Subscription failed: ' + result.error);
    }
  };

  const displayTier = (tier) => (
    <Col md={4} key={tier.id}>
      <Card className="text-center shadow mb-4">
        <Card.Header className={`bg-${tier.name.toLowerCase()} text-white`}>
          <h4 className="my-0">{tier.name}</h4>
        </Card.Header>
        <Card.Body>
          <h1 className="card-title">${tier.price} <small className="text-muted">/ mo</small></h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>{tier.max_usage} AI Technical Inquiries</li>
            <li>DIY Maintenance Guides</li>
            <li>Priority Support</li>
          </ul>
          {userInfo ? (
            <Button
              variant={`outline-${tier.name.toLowerCase()}`}
              className="w-100"
              onClick={() => handleSubscribe(tier)}
            >
              Subscribe via PayPal
            </Button>
          ) : (
            <Button variant="secondary" className="w-100" disabled>
              Login to Subscribe
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">RoofGuard AI Consultant Tiers</h2>

      {tierError && <Alert variant="danger">{tierError}</Alert>}

      {loadingTiers ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {tiers.map(displayTier)}
        </Row>
      )}

      {selectedTier && userInfo && (
        <div className="mt-4">
          <h4 className="mb-3">Complete payment for {selectedTier.name} tier</h4>
          <PayPalButtons
  style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD', 
            value: Number(selectedTier.price).toFixed(2),
          },
        },
      ],
    });
  }}
            onApprove={async (data, actions) => {
              await actions.order.capture();
              handleSubscriptionSuccess(data);
            }}
            onError={(err) => {
              alert('PayPal payment failed: ' + err);
            }}
          />
        </div>
      )}

      {subError && <Alert variant="danger" className="mt-4">{subError}</Alert>}
      {subscribing && <Spinner animation="border" className="mt-4" />}

      {info && info.usage_left !== undefined && (
        <div className="mt-4">
          <h5>Current Subscription</h5>
          <p><strong>Tier:</strong> {info.tier_name}</p>
          <p><strong>Usage Left:</strong> {info.usage_left}</p>
        </div>
      )}
    </Container>
  );
};

export default SubscriptionScreen;