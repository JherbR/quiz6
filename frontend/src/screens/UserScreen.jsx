import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Badge, Container, Modal, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { listUsers } from '../actions/authActions';

const UserScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { users, loading, error } = useSelector(state => state.userList);
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [merchantId, setMerchantId] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [modalType, setModalType] = useState('approve');
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.is_admin) {
      dispatch(listUsers());
      fetchApplications();
    }
  }, [dispatch, userInfo]);

  const fetchApplications = async () => {
    try {
      setAppLoading(true);
      const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
      const { data } = await axios.get('http://127.0.0.1:8000/api/v1/applications/list/', config);
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setAppLoading(false);
    }
  };

  const handleApprove = (app) => {
    setSelectedApp(app);
    setMerchantId('');
    setModalType('approve');
    setShowModal(true);
  };

  const handleDecline = (app) => {
    setSelectedApp(app);
    setDeclineReason('');
    setModalType('decline');
    setShowModal(true);
  };

  const submitApprove = async () => {
    if (!merchantId) {
      alert('Merchant ID is required');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
      await axios.patch(
        `http://127.0.0.1:8000/api/v1/applications/${selectedApp.id}/approve/`,
        { merchant_id: merchantId },
        config
      );
      setShowModal(false);
      fetchApplications();
      alert('Application approved!');
    } catch (error) {
      alert('Error approving application: ' + (error.response?.data?.detail || error.message));
    }
  };

  const submitDecline = async () => {
    if (!declineReason) {
      alert('Decline reason is required');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
      await axios.patch(
        `http://127.0.0.1:8000/api/v1/applications/${selectedApp.id}/decline/`,
        { decline_reason: declineReason },
        config
      );
      setShowModal(false);
      fetchApplications();
      alert('Application declined!');
    } catch (error) {
      alert('Error declining application: ' + (error.response?.data?.detail || error.message));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <Badge bg="success">{status}</Badge>;
      case 'Declined': return <Badge bg="danger">{status}</Badge>;
      case 'Pending': return <Badge bg="warning">{status}</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (!userInfo?.is_admin) {
    return <Container className="py-4"><Alert variant="danger">Access denied. Admin only.</Alert></Container>;
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col><h1>Platform Oversight</h1></Col>
      </Row>

      {/* Users Table */}
      <h3>Users</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="table-responsive mb-5">
          <Table striped bordered hover className="table-light shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                    <Button variant="outline-danger" size="sm">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Seller Applications Table */}
      <h3>Seller Applications</h3>
      {appLoading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-muted">No seller applications found.</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="table-light shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>License</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.user_email}</td>
                  <td>{app.business_license || 'N/A'}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    {app.status === 'Pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleApprove(app)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDecline(app)}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                    {app.status === 'Declined' && app.decline_reason && (
                      <small className="text-muted">{app.decline_reason}</small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'approve' ? 'Approve Application' : 'Decline Application'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'approve' ? (
            <Form.Group>
              <Form.Label>Merchant ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter merchant ID for this seller"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Decline Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Explain why this application is being declined"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button
            variant={modalType === 'approve' ? 'success' : 'danger'}
            onClick={modalType === 'approve' ? submitApprove : submitDecline}
          >
            {modalType === 'approve' ? 'Approve' : 'Decline'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserScreen;