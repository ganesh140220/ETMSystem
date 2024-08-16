import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import { useSelector } from 'react-redux';
import { useHistory, useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const obj = useSelector((state) => state.myobj.obj);
  const clientobj = useSelector(state => state.myobj.clientobj);
  const myrole = obj.login.role.role1;
  const navigate=useNavigate()

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState(0);
  const [clientId, setClientId] = useState(0);
  const [createdBy, setCreatedBy] = useState(obj.id); // Default to empid

  const formatDateTime = (date) => {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');

    const day = padTo2Digits(date.getDate());
    const month = padTo2Digits(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padTo2Digits(date.getHours());
    const minutes = padTo2Digits(date.getMinutes());
    const seconds = padTo2Digits(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const [createdDate, setCreatedDate] = useState(formatDateTime(new Date())); // Default to today with formatted date
  const [status, setStatus] = useState('unassigned');
  const [completedDate, setCompletedDate] = useState('');
  const [err, setErr] = useState('');
  const [showModal, setShowModal] = useState(false);

 

  const validateForm = () => {
    if (!projectTitle) {
      setErr('Project Title is required.');
      return false;
    }
    if (!description) {
      setErr('Description is required.');
      return false;
    }
    if (!clientId) {
      setErr('Client ID is required.');
      return false;
    }

    setErr('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProject = {
      project: {
        id: 0,
        projectTitle,
        description,
        assignedTo,
        clientId,
        createdBy,
        createdDate,
        status,
        completedDate,
      },
      teammember: {
        teamId: 0,
        empId: createdBy,
        projectId: 0
      }
    };

    console.log('New Project:', newProject);
    // Perform API call to create the project here

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
              <h2 className="text-center mb-4 text-white">Create Project</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProjectTitle" className="mb-3">
                  <Form.Label className='text-white mt-2'>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter project title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label className='text-white mt-2'>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formClientId" className="mb-3">
                  <Form.Label className='text-white mt-2'>Client ID</Form.Label>
                  <Form.Select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select a client</option>
                    {clientobj.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button className='mt-3' variant="primary" type="submit">
                  Create Project
                </Button>
                {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
              </Form>
            </div>
          </Col>
        </Row>

        {/* Modal for success message */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Project Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your project has been successfully created.</p>
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

export default CreateProject;
