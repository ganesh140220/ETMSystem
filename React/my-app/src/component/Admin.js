import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import './Admin.css';

const Admin = () => {
  const [bool,setBool]=useState(true)
  const loc=useLocation()
  const c=loc.state.loginid
  useEffect(() => {
    if (loc.state.role.role1 === 'MasterAdmin') {
      setBool(false);
    }
  }, [loc.state.role.role1]);
  
  

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    
    <div className="admin-container">
      <h1>{loc.state.role.role1} Dashboard {c}</h1>  
           

      <div className="admin-logout">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-actions">
        
        <div className="registration-buttons">
          <button hidden={bool}><Link to="/register/admin" className="link-button"  >Register Admin</Link></button><br/>
          <button><Link to="/register/employee" className="link-button">Register Employee</Link></button><br/>
          <button><Link to="/register/manager" className="link-button">Register Manager</Link></button><br/>
        </div>

        
        <div className="create-project">
          <button><Link to="/create-project" className="link-button">Create Project</Link></button>
        </div>

      
        <div className="view-entities">
          <button><Link to="/view-entities" className="link-button">View All Entities</Link></button>
        </div>

     
        <div className="personal-details">
          <button><Link to="/personal-details" className="link-button">Personal Details</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
