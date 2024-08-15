import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import { useSelector } from 'react-redux';

const CreateProject = () => {
  const obj = useSelector((state) => state.myobj.obj);
  const myrole = obj.login.role.role1;

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [clientId, setClientId] = useState('');
  const [createdBy, setCreatedBy] = useState(obj.login.username); // Default to logged-in user
  const [createdDate, setCreatedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [status, setStatus] = useState('Pending');
  const [completedDate, setCompletedDate] = useState('');
  const [err, setErr] = useState('');

  const validateForm = () => {
    if (!projectTitle) {
      setErr('Project Title is required.');
      return false;
    }
    if (!description) {
      setErr('Description is required.');
      return false;
    }
    if (!assignedTo) {
      setErr('Assigned To is required.');
      return false;
    }
    if (!clientId) {
      setErr('Client ID is required.');
      return false;
    }
    if (!createdBy) {
      setErr('Created By is required.');
      return false;
    }
    if (!status) {
      setErr('Status is required.');
      return false;
    }
    setErr('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProject = {
      projectTitle,
      description,
      assignedTo,
      clientId,
      createdBy,
      createdDate,
      status,
      completedDate,
    };

    console.log('New Project:', newProject);
    // Perform API call to create the project here
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Container style={containerStyle} fluid>
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

                <Form.Group controlId="formAssignedTo" className="mb-3">
                  <Form.Label className='text-white mt-2'>Assigned To</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the name of the person assigned to the project"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formClientId" className="mb-3">
                  <Form.Label className='text-white mt-2'>Client ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCreatedBy" className="mb-3">
                  <Form.Label className='text-white mt-2'>Created By</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the username of the creator"
                    value={createdBy}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formCreatedDate" className="mb-3">
                  <Form.Label className='text-white mt-2'>Created Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formStatus" className="mb-3">
                  <Form.Label className='text-white mt-2'>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formCompletedDate" className="mb-3">
                  <Form.Label className='text-white mt-2'>Completed Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={completedDate}
                    onChange={(e) => setCompletedDate(e.target.value)}
                  />
                </Form.Group>

                <Button className='mt-3' variant="primary" type="submit">
                  Create Project
                </Button>
                {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateProject;
