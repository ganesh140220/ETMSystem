import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Manager = () => {
  const navigate = useNavigate();
  const obj = useSelector(state => state.myobj.obj);
  const proj = useSelector(state => state.myobj.projobj);
  const clientobj = useSelector(state => state.myobj.clientobj);
  const team = useSelector(state => state.myobj.teamobj);
  
  const isProjectAvailable = proj.id !== undefined && proj.id !== null;
  const isTeamAvailable = team[0]?.teamId !== undefined && team[0]?.teamId !== null && team.length>1;
  const client = clientobj.find(client => client.id === proj.clientId);

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '90px' }}></div>
   
      <div className="dashboard-content p-4">
        <h1 style={{color:"purple"}}>Project Title: {isProjectAvailable ? proj.projectTitle : "No Project Assigned"}</h1>
        {isProjectAvailable&& <h3 style={{color:"pink"}}>Client Name: { client.name}</h3>}
        <header className="d-flex justify-content-between align-items-center">
          <h1 className='mt-4'>Dashboard</h1>
          <div>
            <span className="badge bg-primary">Manager</span>
          </div>
        </header>

        <div className="row mt-4">
          {/* Cards */}
          <div className="col-md-3">
            <div className="card bg-info text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Create Team Members</h5>
                {isProjectAvailable ? (
                  <Link to="/createTeam"><p>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Team-Members</h5>
                <Link to="/viewTeamMembers"><p style={{color: "black"}}>Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Create-Task</h5>
                {isProjectAvailable && isTeamAvailable? (
                  <Link to="/tasks/create"><p>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Queries of Associates</h5>
                {isProjectAvailable && isTeamAvailable ? (
                  <Link to="/associatesQuery"><p>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-black text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Pending Tasks</h5>
                {isProjectAvailable && isTeamAvailable? (
                  <Link to="/alltasks?status=1"><p>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">In-Progress Tasks</h5>
                {isProjectAvailable && isTeamAvailable ? (
                  <Link to="/alltasks?status=2"><p style={{color: "black"}}>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Completed Tasks</h5>
                {isProjectAvailable && isTeamAvailable? (
                  <Link to="/alltasks?status=3"><p style={{color: "black"}}>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-light text-dark mb-4">
              <div className="card-body">
                <h5 className="card-title">All Tasks</h5>
                {isProjectAvailable && isTeamAvailable? (
                  <Link to="/alltasks?status=4"><p>Show Info</p></Link>
                ) : (
                  <p style={{ color: 'gray', cursor: 'not-allowed' }}>Show Info</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default Manager;
