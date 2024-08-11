import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ViewEmployee = ({ employeeId }) => {
  // Assuming you have a Redux state that contains employee details
  const employee =10

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div className="bg-white d-flex align-items-center justify-content-center min-vh-100">
    <Container fluid >
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Employee Details</Card.Title>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>First Name:</strong> {employee.firstName}
                </Col>
                <Col md={6}>
                  <strong>Last Name:</strong> {employee.lastName}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>Login ID:</strong> {employee.loginId}
                </Col>
                <Col md={6}>
                  <strong>Email:</strong> {employee.email}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>Role:</strong> {employee.role}
                </Col>
                <Col md={6}>
                  <strong>Designation:</strong> {employee.designation}
                </Col>
              </Row>
              <div className="text-center mt-3">
                <Button variant="secondary" onClick={() => window.history.back()}>Back</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ViewEmployee;
