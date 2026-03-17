import React from 'react';
import { Row, Col, Table, Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { userInfo } = useSelector(state => state.userLogin);

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3>My Profile</h3>
              <p><strong>Name:</strong> {userInfo.first_name} {userInfo.last_name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Location:</strong> {userInfo.location}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>My Orders</h3>
          <Table striped hover responsive className="bg-white shadow-sm mt-3">
            <thead>
              <tr>
                <th>SERVICE</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAYMENT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gutter Cleaning</td>
                <td>2026-03-10</td>
                <td>$120.00</td>
                <td><span className="text-success">Paid Directly to Seller</span></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;