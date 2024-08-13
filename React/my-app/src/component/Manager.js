import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Manager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = useSelector(state => state.myobj.obj);
  const proj = useSelector(state => state.myobj.projobj);
  const team = useSelector(state => state.myobj.teamobj);

  
  return (
    <div style={{ marginTop: '100px' }}>
      <div className="dashboard-content p-4">
        <header className="d-flex justify-content-between align-items-center">
          <h1>Dashboard</h1>
          <div>
            <span className="badge bg-primary">Manager</span>
          </div>
        </header>

        <div className="row mt-4">
          {/* Cards */}
          <div className="col-md-3" >
            <div className="card bg-info text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Admins</h5>
                <Link to={"/admins"}> <p>Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                
                <h5 className="card-title">Team-Members</h5>
                <Link to={"/viewTeamMembers"}> <p className="text-black">Show Info</p></Link>
            </div>
          </div>
          </div>
          <div className="col-md-3" >
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Create-Task</h5>
                <Link to={"/tasks/create"}> <p>Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Queries of Associates</h5>
                <Link to={"/tasks/create"}> <p>Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-black text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Pending Tasks</h5>
                <Link to={"/alltasks?status=1"}><p >Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title"> In-Progress Tasks</h5>
                <Link to={"/alltasks?status=2"}> <p className="text-black">Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3" >
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Completed Tasks</h5>
                <Link to={"/alltasks?status=3"}><p className="text-black">Show Info</p></Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-light text-dark mb-4">
              <div className="card-body">
                <h5 className="card-title">All Tasks</h5>
                <Link to={"/alltasks?status=4"}><p>Show Info</p></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2>Pending Tasks</h2>
          {/* Table for pending tasks */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Project</th>
                <th>Task</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Date</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {obj.tasks.filter(task => task.status === 'pending').map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.project}</td>
                  <td>{task.title}</td>
                  <td>{task.duration}</td>
                  <td>{task.status}</td>
                  <td>{task.date}</td>
                  <td>
                    <Button onClick={() => navigate(`/tasks/${task.id}`)}>Manage</Button>
                  </td>
                </tr>
              ))}
              {obj.tasks.filter(task => task.status === 'pending').length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No pending tasks available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
};

export default Manager;
