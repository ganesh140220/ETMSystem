
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [uid, setUserId] = useState('');
    const [pwd, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //.NET API for authentication
        
            const response = await fetch('https://localhost:7018/ETMS/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, pwd }),
            });
    
            if (response.ok) {
                
                const data = await response.json();
               if(data.role==undefined)setErr(data.err)
                else{
                setUserType(data.role.rolename);
    
                switch (data.role.rolename) {
                    case 'Admin':
                        navigate('/admin',{state:data});
                        break;
                    case 'Manager':
                        navigate('/manager',{state:data});
                        break;
                    case 'Associate':
                        navigate('/employee',{state:data});
                        break;
                    default:
                        alert("Invalid Role");
                }
            }
            } else {
                // Handle non-OK response (e.g., server error)
                
                console.log('API call failed:', response.status);
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
                {err}
            </form>
        </div>
    );
};

export default Login;
