import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Manager = () => {

  const id=useSelector((state)=>state.myobj.id) 
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    // Set username or other data from location state
    if (location.state) {
      setUserName(location.state.employee.firstName || '');
    }
  }, [location.state]);
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    
    <Container fluid className="bg-success min-vh-100 p-0">
    <div className="admin-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid className="text-dark ">
          <Navbar.Brand>ETMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />

           {/* collapasable after screen gets reduced*/}
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="#" ><a className="text-info">Manager-Dashboard</a></Nav.Link>
              <Nav.Link as={Link} to="#">View Project</Nav.Link>
              <Nav.Link as={Link} to="#">Create Employee</Nav.Link>
              <Nav.Link as={Link} to="#">View Employee</Nav.Link>
              <Nav.Link as={Link} to="#">Personal Details</Nav.Link>
            </Nav>
          </Navbar.Collapse>

           {/*non collapasable after screen gets reduced*/}
          <Nav className="ms-auto">
              <Nav.Item className="d-flex align-items-center">
                <Navbar.Text className="text-white me-3">
                  Welcome {userName}
                </Navbar.Text>
                <Button variant="outline-light" className='bg-primary' onClick={handleLogout}>Logout</Button>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar>

      <Container fluid className="pt-5 mt-5">
        {/* Your admin-specific content goes here */}
       <h1>All Projects</h1>
      </Container>
    </div>
    </Container>
  );
}

export default Manager;
