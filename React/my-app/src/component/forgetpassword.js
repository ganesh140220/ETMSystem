import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import { useDispatch } from 'react-redux';
import { setclientobj, setobj, setprojobj, setteamobj } from './slicefile';

const ForgetPassword = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [sessionerr, setSessionErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle form submission logic
        fetch("http://localhost:8080/forgetpassword?username="+username)
        .then(res=>res.text())
        .then(state=>console.log(state))
        .catch(err=>console.log(err))

        setErr("Password has been sent to your register Email")
        setIsLoading(false);
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    };

    return (
        <Container style={containerStyle} fluid className="bg-white d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col md={4} className="mx-auto">
                    <div className="right-div border p-3 rounded shadow-sm bg-dark">
                        <h2 className="text-center mb-4 text-white">Forgot Password</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername" className="mb-3 text-white">
                                <Form.Label>Enter Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
                                {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                            </Button>
                        </Form>
                        {/* Display errors */}
                        {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
                        
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgetPassword;
