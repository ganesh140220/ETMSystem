import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal, Spinner } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const obj = useSelector((state) => state.myobj.obj);
  const navigate = useNavigate();
  const myrole = obj.login.role.role1;

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/${myrole}`); // Redirect to the dashboard
  };

  const namePattern = /^[a-zA-Z\s]{2,30}$/; // Name must be letters and spaces, 2-30 characters
  const emailPattern = /\S+@\S+\.\S+/; // Basic email validation
  const userIdPattern = /^[a-zA-Z0-9]{4,12}$/; // User ID pattern

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [designation, setDesignation] = useState('');
  const [err, setErr] = useState('');

  const validateForm = () => {
    if (!namePattern.test(firstName)) {
      setErr('First Name must be letters only and 2-30 characters long.');
      return false;
    }
    if (!namePattern.test(lastName)) {
      setErr('Last Name must be letters only and 2-30 characters long.');
      return false;
    }
    if (!userIdPattern.test(loginId)) {
      setErr('User ID must be alphanumeric and 4-12 characters long.');
      return false;
    }
    if (!emailPattern.test(email)) {
      setErr('Email address is invalid.');
      return false;
    }
    if (!role || role === 'Select') {
      setErr('Role is required.');
      return false;
    }
    if (!designation || designation === 'Select') {
      setErr('Designation is required.');
      return false;
    }
    setErr('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start loading

    // Create new employee object
    const newEmp = {
      firstName: firstName,
      lastName: lastName,
      emailId: email,
      address: "",
      contactNo: 0,
      desigId: designation,
      login: {
        username: loginId,
        password: "",
        roleid: role,
        active: 1,
      },
    };

    fetch('http://localhost:8080/createEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmp),
    })
      .then((response) => response.text())
      .then((data) => {
        setLoading(false); 
        if(data!="Employee Has been Created Successfully"){
          setErr(data);
        }
         else {
          setShowModal(true);
          setFirstName('');
          setLastName('');
          setLoginId('');
          setEmail('');
          setRole('');
          setDesignation('');
          setErr(data)
        }
      })
      ;
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Container style={containerStyle} fluid className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="right-div border p-3 rounded shadow-sm bg-dark mt-5">
              <h2 className="text-center mb-4 text-white">Create Employee</h2>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label className='text-white mt-2'>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label className='text-white mt-2'>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formLoginId" className="mb-3">
                  <Form.Label className='text-white mt-2'>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className='text-white mt-2'>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formRole" className="mb-3">
                      <Form.Label className='text-white mt-2'>Role</Form.Label>
                      <Form.Control
                        as="select"
                        value={role}
                        className="form-select"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select</option>
                        {myrole === "MasterAdmin" && <option value="2">Admin</option>}
                        {(myrole === "Admin" || myrole === "MasterAdmin") && <option value="3">Manager</option>}
                        {myrole !== "Associate" && <option value="4">Associate</option>}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formDesignation" className="mb-3">
                      <Form.Label className='text-white mt-2'>Designation</Form.Label>
                      <Form.Control
                        as="select"
                        placeholder="Enter designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="form-select"
                      >
                        <option value="Select">Select</option>
                        <option value="1">Software Developer</option>
                        <option value="2">Tester</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Button className='mt-3' variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Create Employee'}
                </Button>
                {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
              </Form>
            </div>
          </Col>
        </Row>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Employee Created</Modal.Title>
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

export default CreateEmployee;
