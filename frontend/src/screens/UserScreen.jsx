import React from 'react';
import { Table, Button, Row, Col, Badge } from 'react-bootstrap';

const UserScreen = () => {
  return (
    <div className="py-4">
      <Row className="mb-4">
        <Col><h1>Platform Oversight</h1></Col>
      </Row>
      <Table striped bordered hover responsive className="table-light shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>CONTRACTOR</th>
            <th>LICENSE</th>
            <th>LOCATION</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pampanga Roofing Co.</td>
            <td>PH-9921</td>
            <td>Mabalacat</td>
            <td><Badge bg="warning">Pending</Badge></td>
            <td>
              <Button variant="success" size="sm" className="me-2">Approve</Button>
              <Button variant="danger" size="sm">Decline</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserScreen;