import React from 'react';

function ManagerDashboard() {
  return (
    <div style={{marginTop:'100px'}}>
    <div className="dashboard-content p-4">
      <header className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <div>
          <span className="badge bg-primary">Manager</span>
        </div>
      </header>
      
      <div className="row mt-4">
        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card bg-info text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">2 Admins</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col-md-3">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">4 Team-Members</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col-md-3">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">4 Create-Task</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="col-md-3">
          <div className="card bg-danger text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">10 Designations</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 5 */}
        <div className="col-md-3">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">0 UnAssigned-Tasks</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 6 */}
        <div className="col-md-3">
          <div className="card bg-secondary text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">0 Pending Tasks</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 7 */}
        <div className="col-md-3">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">0 Completed Tasks</h5>
              <p>Show Info</p>
            </div>
          </div>
        </div>
        {/* Card 8 */}
        <div className="col-md-3">
          <div className="card bg-light text-dark mb-4">
            <div className="card-body">
              <h5 className="card-title">0 Task-Progress</h5>
              <p>Show Info</p>
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
            <tr>
              <td colSpan="7" className="text-center">No data available in table</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default ManagerDashboard;

