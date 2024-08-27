import React, { useState } from 'react';
import { Container, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import { useSelector } from 'react-redux';
import backgroundImage from './functionality/desktop-wallpaper-administrative-assistant-top-needed-skills-office-administration.jpg';

const Admin = () => {
  const obj = useSelector((state) => state.myobj.obj);
  const [userRole, setUserRole] = useState(obj.login.role.role1 || '');

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
  };

  return (
    <div className="bg-dark text-white d-flex align-items-center justify-content-center min-vh-100">
      
      <Container style={containerStyle} fluid className="bg-white d-flex align-items-center min-vh-100">
      
      <header className="dashboard-header">
          <h1>Dashboard {userRole}</h1>
        </header>

        <Col md={9} className="d-flex justify-content-end">
          <Card className="bg-white bg-opacity-75" style={{height:"400px", width:"400px"}}>
            <Card.Body>
              <Card.Title className="transparent-card-title">Admin Overview</Card.Title>
              <Card.Text className="transparent-card-text">
                As an admin, you have access to a range of powerful tools to manage the system. Below are some of the key functionalities:
                <ul>
                  <li><strong>User Management:</strong> Add, edit, and remove users. Manage roles and permissions.</li>
                  <li><strong>Project Management:</strong> Oversee project progress, assign tasks, and track performance.</li>
                  <li><strong>Reports:</strong> Generate and view detailed reports on system usage, user activity, and more.</li>
                  <li><strong>Settings:</strong> Customize system settings, configure integrations, and manage notifications.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <footer>
          {/* <p>Employee Project Management System. All rights reserved.</p> */}
        </footer>
      </Container>
    </div>
  );
};

export default Admin;
