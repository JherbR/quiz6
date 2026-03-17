import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Row, Col, Container, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.userLogin);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [merchantId, setMerchantId] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [modalType, setModalType] = useState('approve');

  useEffect(() => {
    if (!userInfo?.is_admin) {
      navigate('/');
      return;
    }
    
    fetchApplications();
  }, [userInfo, navigate]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
      const { data } = await axios.get('http://127.0.0.1:8000/api/v1/applications/list/', config);
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
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

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col><h1>Seller Applications</h1></Col>
      </Row>
      
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-muted">No seller applications found.</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Applied On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.user_details?.email || 'Unknown'}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>{new Date(app.created_at).toLocaleDateString()}</td>
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

export default AdminDashboard;
