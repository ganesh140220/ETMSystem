import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import backgroundImage from './back.jpg';
import myimg from "./download.jpeg"
import { useDispatch } from 'react-redux';
import { setclientobj, setobj, setprojobj, setteamobj } from './slicefile';

const Login = () => {
    const [uid, setUserId] = useState('');
    const [pwd, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Regular expressions for validation
    const userIdPattern = /^[a-zA-Z0-9]{4,12}$/; // Alphanumeric, 4-12 characters
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, at least one letter and one number

    const validateForm = () => {
        if (!userIdPattern.test(uid)) {
            setErr('User ID must be alphanumeric and 4-12 characters long.');
            return false;
        }
        if (!passwordPattern.test(pwd)) {
            setErr('Password must be at least 8 characters long, with at least one letter and one number.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErr('');

        try {
            const response = await fetch('https://localhost:7018/ETMS/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, pwd }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.login === undefined) {
                    setErr(data.err);
                } else {

                    dispatch(setobj(data));

                    switch (data.login.role.role1) {
                        case 'MasterAdmin':
                            await fetch("https://localhost:7018/ETMS/clients")
                                .then(res => res.json())
                                .then(d => dispatch(setclientobj(d)))

                            navigate('/MasterAdmin');
                            break;
                        case 'Admin':
                            await fetch("https://localhost:7018/ETMS/clients")
                                .then(res => res.json())
                                .then(d => dispatch(setclientobj(d)))
                            navigate('/Admin');
                            break;

                        case 'Manager':
                            await fetch("https://localhost:7018/ETMS/team?pid=" + data.teamMembers[0]?.projectId)
                                .then(res => res.json())
                                .then(d =>{console.log(data);dispatch(setteamobj(d))} )
                                
                            await fetch("https://localhost:7018/ETMS/project?pid=" + data.teamMembers[0]?.projectId)
                                .then(res => res.json())
                                .then(d => dispatch(setprojobj(d)))
                                
                            await fetch("https://localhost:7018/ETMS/clients")
                                .then(res => res.json())
                                .then(d => dispatch(setclientobj(d)))
                            navigate('/Manager');
                            break;
                        case 'Associate':
                            await fetch("https://localhost:7018/ETMS/team?pid=" + data?.teamMembers[0]?.projectId)
                                .then(res => res.json())
                                .then(d => dispatch(setteamobj(d)))

                            await fetch("https://localhost:7018/ETMS/project?pid=" + data?.teamMembers[0]?.projectId)
                                .then(res => res.json())
                                .then(d => dispatch(setprojobj(d)))
                            navigate('/Associate');
                            break;
                        default:
                            setErr("Invalid Role");
                    }
                }
            } else {
                setErr('Login failed. Please try again.');
                console.log('API call failed:', response.status);
            }
        } catch (error) {
            setErr('An error occurred. Please try again later.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Adjusts the image to cover the entire container
        backgroundPosition: 'center', // Centers the image
        height: '100vh', // Full viewport height
        width: '100%', // Full width
    };

    return (
        <Container style={containerStyle} fluid className="bg-white d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">

                <Col md={4} className="mx-auto">

                    <div className="right-div border p-3 rounded shadow-sm bg-dark ">

                        <h2 className="text-center mb-4 text-white">Login</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUserId" className="mb-3 text-white">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={uid}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3 text-white">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={pwd}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-end mb-3">
                                <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                            </div>
                            <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
                                {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
                            </Button>
                        </Form>

                        {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
