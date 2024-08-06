import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css'; // Ensure correct import path

const Admin = () => {
<<<<<<< HEAD
  
  const loc=useLocation()
  const { loginid, username, roleid, employee } = loc.state;

=======
  const location = useLocation();
>>>>>>> 838fc7959169ca6ea378e4876b0dcd8f61b27947
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Set username or other data from location state
    if (location.state) {
      setUserName(location.state.loginid || '');
    }
  }, [location.state]);

  const handleLogout = () => {
    // Redirect to login page
    navigate('/login');
  };

  return (
    
    <div className="admin-container">
<<<<<<< HEAD
      <h1>{roleid} Welcome Admin {username}</h1>
           
=======
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">ETMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/create-project">Create Project</Nav.Link>
              <Nav.Link as={Link} to="/view-entities">View All Entities</Nav.Link>
              <Nav.Link as={Link} to="/personal-details">Personal Details</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Item className="d-flex align-items-center">
                <Navbar.Text className="text-white me-3">
                  Welcome, {userName}
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
>>>>>>> 838fc7959169ca6ea378e4876b0dcd8f61b27947

      <Container fluid className="pt-5 mt-5">
        {/* Your admin-specific content goes here */}
      </Container>
    </div>
  );
};

export default Admin;
