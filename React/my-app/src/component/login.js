
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [uid, setUserId] = useState('');
    const [pwd, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //.NET API for authentication
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
                setUserType(data.role.rolename);
    
                switch (userType) {
                    case 'Admin':
                        navigate('/admin');
                        break;
                    case 'Manager':
                        navigate('/manager');
                        break;
                    case 'Associate':
                        navigate('/employee');
                        break;
                    default:
                        alert(userType);
                }
            } else {
                // Handle non-OK response (e.g., server error)
                console.error('API call failed:', response.status);
            }
        } catch (error) {
            // Handle fetch error (e.g., network issues)
            console.error('Fetch error:', error);
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
                        value={uid} 
                        onChange={(e) => setUserId(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={pwd} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
