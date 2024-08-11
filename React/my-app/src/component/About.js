import React from 'react';
import backgroundImage from './back.jpg';
import { Container, Row, Col, Card } from 'react-bootstrap';

const containerStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover', // Adjusts the image to cover the entire container
  backgroundPosition: 'center', // Centers the image
  backgroundRepeat: 'no-repeat', // Prevents repeating the image
  minHeight: '100vh', // Ensures container covers at least the viewport height
  width: '100%', // Full width
  display: 'flex',
  alignItems: 'center', // Centers content vertically
  justifyContent: 'center', // Centers content horizontally
};

const About = () => {
  return (
    <Container style={containerStyle} fluid className="about-container bg-light min-vh-100 py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="bg-white bg-opacity-75">
            <Card.Body>
              <Card.Title className="text-center mb-4">About Us</Card.Title>
              <Card.Text>
                <h5>Welcome to the Employee Task Management System!</h5>
                <p>
                  Our system is designed to streamline the management of employee tasks, making it easier for organizations to keep track of assignments, deadlines, and productivity.
                </p>
                <p>
                  <strong>Key Features:</strong>
                  <ul>
                    <li>Task Assignment: Assign tasks to employees and track their progress.</li>
                    <li>Deadline Management: Set and manage deadlines to ensure timely completion of tasks.</li>
                    <li>Performance Tracking: Monitor and evaluate employee performance based on task completion.</li>
                    <li>Customizable Roles: Define different roles and permissions to fit your organization’s structure.</li>
                  </ul>
                </p>
                <p>
                  Our mission is to enhance productivity and ensure effective task management through a user-friendly and efficient platform. Whether you are a small team or a large organization, our system is designed to adapt to your needs and help you achieve your goals.
                </p>
                <p>
                  <strong>Contact Us:</strong>
                  If you have any questions or need support, please feel free to reach out to us at <a href="mailto:support@example.com">support@example.com</a>.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
