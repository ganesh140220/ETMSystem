import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import yourImage from './download.jpeg';
import youImage from './download (1).jpeg';

function Home() {
    return (
        <div className="bg-dark text-white min-vh-100 p-0">
    <Container fluid>
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
        </div>
    );
}

export default Home;
