import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
    const [uid, setUserId] = useState('');
    const [pwd, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

                if (data.role === undefined) {
                    setErr(data.err);
                } else {
                    switch (data.role.role1) {
                        case 'MasterAdmin':
                            navigate('/admin', { state: data });
                            break;
                        case 'Admin':
                            navigate('/admin', { state: data });
                            break;
                        case 'Manager':
                            navigate('/manager', { state: data });
                            break;
                        case 'Associate':
                            navigate('/employee', { state: data });
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

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col md={4} className="mx-auto">
                    <div className="border p-4 rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUserId" className="mb-3">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={uid}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
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
