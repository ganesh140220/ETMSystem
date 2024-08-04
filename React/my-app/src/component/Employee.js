import React from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';

const Employee = () => {

  const loc=useLocation()
  const c=loc.state.loginid
  
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="employee-container">
      <h1>Employee Dashboard {c}</h1>

      <div className="employee-logout">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="employee-actions">
        {/* Employee Details Button */}
        <div className="employee-details">
          <button><Link to="/employee-details">Employee Details</Link></button>
        </div>

        {/* Project Information Button */}
        <div className="project-info">
          <button><Link to="/project-info">Project Information</Link></button>
        </div>

        {/* Personal Data Button */}
        <div className="personal-data">
          <button><Link to="/personal-data">Personal Data</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Employee;
