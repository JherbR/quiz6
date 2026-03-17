import React from 'react';
import { Table, Container } from 'react-bootstrap';

const SubscriptionList = () => {
  return (
    <Container className="py-4">
      <h2>Platform Subscriptions</h2>
      <Table striped bordered hover className="mt-4 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>USER</th>
            <th>TIER</th>
            <th>DATE SUBSCRIBED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>john@example.com</td>
            <td>Premium</td>
            <td>2026-03-15</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default SubscriptionList;