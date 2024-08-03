
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //.NET API for authentication
        const response = await fetch('http://your-api-url/api/login     ***********    ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setUserType(data.userType);

            
            switch (data.userType) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'manager':
                    navigate('/manager');
                    break;
                case 'employee':
                    navigate('/employee');
                    break;
                default:
                    alert('Unknown user type');
            }
        } else {
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input 
                        type="text" 
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
