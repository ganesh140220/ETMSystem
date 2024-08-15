import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import { useSelector } from 'react-redux';

const CreateEmployee = () => {
  const obj = useSelector((state) => state.myobj.obj);
  const myrole = obj.login.role.role1;

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    email: '',
    role: '',
    designation: '',
  });
  const [err, setErr] = useState('');
  const [newEmp, setNewEmp] = useState(null);

  const namePattern = /^[a-zA-Z\s]{2,30}$/;
  const emailPattern = /\S+@\S+\.\S+/;
  const userIdPattern = /^[a-zA-Z0-9]{4,12}$/;

  const validateForm = () => {
    const { firstName, lastName, loginId, email, role, designation } = formValues;

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

    const { firstName, lastName, loginId, email, role, designation } = formValues;

    const newEmployee = {
      firstName,
      lastName,
      emailId: email,
      address: '',
      contactNo: 0,
      desigId: designation,
      login: {
        username: loginId,
        password: '',
        roleid: role,
        active: 1,
      },
    };

    setNewEmp(newEmployee);

    fetch('http://localhost:8080/createEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          setErr(data.err);
        } else {
          setErr('Employee created successfully');
        }
      })
      .catch((err) => {
        setErr('An error occurred. Please try again.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Container
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
      >
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="right-div border p-3 rounded shadow-sm bg-dark mt-5">
              <h2 className="text-center mb-4 text-white">Create Employee</h2>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label className="text-white mt-2">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label className="text-white mt-2">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formLoginId" className="mb-3">
                  <Form.Label className="text-white mt-2">User ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User ID"
                    name="loginId"
                    value={formValues.loginId}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className="text-white mt-2">Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formRole" className="mb-3">
                      <Form.Label className="text-white mt-2">Role</Form.Label>
                      <Form.Control
                        as="select"
                        name="role"
                        value={formValues.role}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {myrole === 'MasterAdmin' && <option value="2">Admin</option>}
                        {(myrole === 'Admin' || myrole === 'MasterAdmin') && (
                          <option value="3">Manager</option>
                        )}
                        {myrole !== 'Associate' && <option value="4">Associate</option>}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formDesignation" className="mb-3">
                      <Form.Label className="text-white mt-2">Designation</Form.Label>
                      <Form.Control
                        as="select"
                        name="designation"
                        value={formValues.designation}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="Select">Select</option>
                        <option value="1">Software Developer</option>
                        {/* Add more options as needed */}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="mt-3" variant="primary" type="submit">
                  Create Employee
                </Button>
                {err && <Alert variant={err.includes('successfully') ? 'success' : 'danger'} className="mt-3">{err}</Alert>}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateEmployee;
