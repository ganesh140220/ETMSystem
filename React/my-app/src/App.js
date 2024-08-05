import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './component/Home';
import Login from './component/login';
import Admin from './component/Admin';
import Manager from './component/Manager';
import Employee from './component/Employee';


const App = () => {
  const [showNavItems, setShowNavItems] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Check the current path and update navigation visibility
    if (location.pathname === '/login') {
      setShowNavItems(false);
    } else {
      setShowNavItems(true);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">ETMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {showNavItems && (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="#">About Us</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="p-0 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/employee" element={<Employee />} />
          {/* Add other routes as needed */}
        </Routes>
      </Container>
    </div>
  );
}

// Wrap the App component in Router when rendering it in the entry point of your application
const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
