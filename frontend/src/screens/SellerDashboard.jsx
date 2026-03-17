import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal, Alert, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createService, listSellerServices, updateService, deleteService } from '../actions/serviceActions'; // Added update/delete

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { services, loading } = useSelector(state => state.serviceList);
  const { error: createError } = useSelector(state => state.serviceCreate);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [currentServiceId, setCurrentServiceId] = useState(null); // Track which ID to update

  const [formData, setFormData] = useState({
    service_name: '',
    description: '',
    price: '',
    duration_of_service: '',
    sample_image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (userInfo?.is_seller) {
      dispatch(listSellerServices());
    }
  }, [dispatch, userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, sample_image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // OPEN MODAL FOR EDIT
  const editHandler = (service) => {
    setIsEditing(true);
    setCurrentServiceId(service.id);
    setFormData({
      service_name: service.service_name,
      description: service.description,
      price: service.price,
      duration_of_service: service.duration_of_service,
      sample_image: null, // Keep existing image unless a new one is uploaded
    });
    setImagePreview(service.sample_image);
    setShowModal(true);
  };

  // DELETE HANDLER
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      dispatch(deleteService(id)).then(() => dispatch(listSellerServices()));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Append fields to FormData
    formDataToSend.append('service_name', formData.service_name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('duration_of_service', formData.duration_of_service);
    
    // Only append image if a new file was selected
    if (formData.sample_image instanceof File) {
      formDataToSend.append('sample_image', formData.sample_image);
    }

    if (isEditing) {
      await dispatch(updateService(currentServiceId, formDataToSend));
    } else {
      await dispatch(createService(formDataToSend));
    }

    closeModal();
    dispatch(listSellerServices());
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentServiceId(null);
    setFormData({
      service_name: '',
      description: '',
      price: '',
      duration_of_service: '',
      sample_image: null,
    });
    setImagePreview(null);
  };

  if (!userInfo?.is_seller) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Access denied. Sellers only.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Seller Dashboard</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Service
          </Button>
        </Col>
      </Row>

      {createError && <Alert variant="danger">{createError}</Alert>}

      <Row>
        <Col>
          <h3>Your Services</h3>
          {loading ? (
            <p>Loading services...</p>
          ) : services.length === 0 ? (
            <p>No services added yet.</p>
          ) : (
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.service_name}</td>
                    <td>{service.description.substring(0, 50)}...</td>
                    <td>${service.price}</td>
                    <td>{service.duration_of_service} hrs</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => editHandler(service)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => deleteHandler(service.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Service' : 'Add New Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (hours)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration_of_service"
                    value={formData.duration_of_service}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sample Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            {imagePreview && (
              <div className="mb-3">
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
              </div>
            )}
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Service'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SellerDashboard;