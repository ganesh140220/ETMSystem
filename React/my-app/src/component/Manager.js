import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Manager = () => {

  const loc=useLocation()
  const c=loc.state.loginid
  const { loginid, username, roleid, employee } = loc.state;
  
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="manager-container">
      <h1>{roleid} Welcome Manager {username}</h1>
      
      
      <div className="manager-logout">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="manager-actions">
        {/* Create Task Button */}
        <div className="create-task">
          <button><Link to="/create-task">Create Task</Link></button>
        </div>

        {/* View Employee Button */}
        <div className="view-employee">
          <button><Link to="/view-employee">View Employee</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Manager;
