import React, { useEffect } from 'react';
import { Container, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAllSubscriptions } from '../actions/subscriptionActions';

const SubscriptionList = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { subscriptions, loading, error } = useSelector((state) => state.subscriptionListAll);

  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
      dispatch(listAllSubscriptions());
    }
  }, [dispatch, userInfo]);

  if (!userInfo?.is_admin) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Access Denied. Admins only.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Subscription Transactions</h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Transaction ID</th>
              <th>User (Email)</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Subscription Date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.user_email}</td>
                <td>
                  <Badge bg={sub.tier_name === 'Elite' ? 'warning' : 'info'}>
                    {sub.tier_name}
                  </Badge>
                </td>
                <td>
                  <Badge bg="success">Active</Badge>
                </td>
                <td>{new Date(sub.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SubscriptionList;