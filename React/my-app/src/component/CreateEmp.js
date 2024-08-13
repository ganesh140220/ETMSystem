import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import { useSelector } from 'react-redux';

const CreateEmployee = () => {
  const obj = useSelector((state) => state.myobj.obj);
  const myrole=obj.login.role.role1
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  const namePattern = /^[a-zA-Z\s]{2,30}$/; // Name must be letters and spaces, 2-30 characters
  const emailPattern = /\S+@\S+\.\S+/; // Basic email validation

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [err, setErr] = useState('');
  const [designation, setDesignation] = useState('');
  const validateForm = () => {
    
    if (!namePattern.test(firstName)) {
      setErr('First Name must be letters only and 2-30 characters long.');
      return false; 
    }
    if (!namePattern.test(lastName)) {
      setErr('Last Name must be letters only and 2-30 characters long.');return false;
    }
    if (!loginId) {
      setErr('User ID is required.');return false;
    }
    if (!emailPattern.test(email)) {
      setErr('Email address is invalid.');return false;
    }
    if (!role || role === 'Select') {
      setErr('Role is required.');return false;
    }
    if (!designation || designation === 'Select') {
      setErr('Designation is required.');return false;
    }
    setErr('')

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Add logic to handle form submission
   
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
    <Container style={containerStyle} fluid className=" d-flex align-items-center justify-content-center min-vh-100">
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
                      onChange={(e) => setFirstName(e.target.value)}/>
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
<Row><Col md={6}>
              <Form.Group controlId="formRole" className="mb-3">
                <Form.Label className='text-white mt-2'>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                   className="form-select"
                  onChange={(e) => setRole(e.target.value)}>

                  <option value="">Select</option>
                  {myrole=="MasterAdmin"&&(<option value="Admin">Admin</option>)}
                  {(myrole=="Admin"||myrole=="MasterAdmin")&&(<option value="Manager">Manager</option>)}
                  {myrole!="Associate"&&(<option value="Associate">Associate</option>)}
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
                  className="form-select">
                 <option value="Select">Select</option>
                 <option value="1">Software Developer</option>
                 <option value="2">Senior Software Devloper</option>
                 <option value="3">Software Engineer</option>
                </Form.Control>
            
              </Form.Group>
              </Col>
              </Row>
              <Button className='mt-3' variant="primary" type="submit">
                Create Employee
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

export default CreateEmployee;
