import React from 'react';

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="text-center mt-5">EMPLOYEE Project MANAGEMENT SYSTEM</h1>
      <div className="row justify-content-center mt-4">
        {/* Card 1 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-warning text-white text-center">
            <div className="card-body">
              <h2 className="card-title">6</h2>
              <p>UnAssigned Project</p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-info text-white text-center">
            <div className="card-body">
              <h2 className="card-title">4</h2>
              <p>Total Employees</p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-danger text-white text-center">
            <div className="card-body">
              <h2 className="card-title">1</h2>
              <p>In-progress Project</p>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-success text-white text-center">
            <div className="card-body">
              <h2 className="card-title">3</h2>
              <p>Completed Project</p>
            </div>
          </div>
        </div>
        {/* Card 5 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-primary text-white text-center">
            <div className="card-body">
              <h2 className="card-title">4</h2>
              <p>All Projects</p>
            </div>
          </div>
        </div>
        {/* Card 6 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-secondary text-white text-center">
            <div className="card-body">
              <h2 className="card-title">2</h2>
              <p>New Employees</p>
            </div>
          </div>
        </div>
        {/* Card 7 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-dark text-white text-center">
            <div className="card-body">
              <h2 className="card-title">5</h2>
              <p>Pending Approvals</p>
            </div>
          </div>
        </div>
        {/* Card 8 */}
        <div className="col-md-3 mb-4">
          <div className="card bg-light text-dark text-center">
            <div className="card-body">
              <h2 className="card-title">7</h2>
              <p>Overdue Tasks</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center mt-4">
        <p>Employee Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;


