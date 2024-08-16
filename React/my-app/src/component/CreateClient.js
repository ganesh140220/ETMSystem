import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';

import backgroundImage from './back.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateClient = () => {
    const obj=useSelector(state=>state.myobj.obj)
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  const [clientId, setClientId] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [showModal, setShowModal] = useState(false);

 const navigate=useNavigate()

  const validateForm = () => {
    
    if (!contactNo) {
      setErr('Contact Number is required.');
      return false;
    }
    if (!emailId) {
      setErr('Email ID is required.');
      return false;
    }
    if (!name) {
      setErr('Name is required.');
      return false;
    }
    setErr('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newClient = {
      id: clientId,
      contactNo,
      emailId,
      name,
    };

    console.log('New Client:', newClient);
    // Perform API call to create the client here

    fetch('http://localhost:8080/createclient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    })
      .then((response) => response.json())
      .then((data) => {
      setErr("Client has been Created")
      })
      .catch((err) => {
        setErr('An error occurred. Please try again.');
        console.log(err);
      });

    // On successful creation, show the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/${obj.login.role.role1}`); // Redirect to the dashboard
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Container style={containerStyle} fluid>
        <div style={{ marginTop: "80px" }}></div>
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="right-div border p-3 rounded shadow-sm bg-dark mt-5">
              <h2 className="text-center mb-4 text-white">Create Client</h2>
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                  <Form.Label className='text-white mt-2'>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

             

                <Form.Group controlId="formEmailId" className="mb-3">
                  <Form.Label className='text-white mt-2'>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email ID"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formContactNo" className="mb-3">
                  <Form.Label className='text-white mt-2'>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </Form.Group>
                

                <Button className='mt-3' variant="primary" type="submit">
                  Create Client
                </Button>
                {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
              </Form>
            </div>
          </Col>
        </Row>

        {/* Modal for success message */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Client Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{err}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Go to Dashboard
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default CreateClient;
