import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImage from './template.jpg'; 
import rightSectionImage from './template2.png'; 

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container">
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="left-section">
          <h1>Employee Management System</h1>
          <p>This project aims to streamline the management of employees, including roles such as admin, manager, and employees. It allows for efficient project assignments, progress tracking, and communication within the organization.</p>
        </div>
        <div className="right-section">
          <img src={rightSectionImage} alt="Right Section" />
        </div>
      </div>
    </div>
  );
};
=======
import { Container, Row, Col } from 'react-bootstrap';
import yourImage from './download.jpeg';
import youImage from './download (1).jpeg';

function Home() {
    return (
        <Container fluid className="bg-dark text-white min-vh-100 p-0">
            <Row className="justify-content-center align-items-center vh-100">
                <Col md={10} className="text-center">
                    <img src={youImage} alt="Logo" className="mb-4" style={{ width: '100px', height: '50px' }} />
                    <h1 className="display-4">Employee Task Management System</h1>
                    <p className="lead mt-3">
                        Developed and maintained an Employee Task Management System to streamline task assignment, tracking, and reporting.
                        The system enhanced team collaboration, improved project visibility, and increased overall productivity by ensuring efficient task allocation and timely completion.
                    </p>
                    <img src={yourImage} alt="Case Study" className="img-fluid rounded mt-4" style={{ maxWidth: '600px' }} />
                </Col>
            </Row>
        </Container>
    );
}
>>>>>>> 838fc7959169ca6ea378e4876b0dcd8f61b27947

export default Home;
