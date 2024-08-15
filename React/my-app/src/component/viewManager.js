import React, { useState, useEffect } from 'react';

function DashboardCard({ title, count, color }) {
  return (
    <div className="col-md-3">
      <div className={`card bg-${color} text-white mb-4`}>
        <div className="card-body">
          <h5 className="card-title">{count} {title}</h5>
          <p>Show Info</p>
        </div>
      </div>
    </div>
  );
}

function ManagerDashboard() {
  const [dashboardData, setDashboardData] = useState({
    admins: 2,
    teamMembers: 4,
    tasksCreated: 4,
    designations: 10,
    unassignedTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    taskProgress: 0,
  });

  useEffect(() => {
    // Fetch the data from an API or service and update the state
    // setDashboardData(fetchedData);
  }, []);

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
          <DashboardCard title="Admins" count={dashboardData.admins} color="info" />
          <DashboardCard title="Team-Members" count={dashboardData.teamMembers} color="primary" />
          <DashboardCard title="Create-Task" count={dashboardData.tasksCreated} color="warning" />
          <DashboardCard title="Designations" count={dashboardData.designations} color="danger" />
          <DashboardCard title="UnAssigned-Tasks" count={dashboardData.unassignedTasks} color="success" />
          <DashboardCard title="Pending Tasks" count={dashboardData.pendingTasks} color="secondary" />
          <DashboardCard title="Completed Tasks" count={dashboardData.completedTasks} color="dark" />
          <DashboardCard title="Task-Progress" count={dashboardData.taskProgress} color="light" />
        </div>

        <div className="mt-4">
          <h2>Pending Tasks</h2>
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
              {/* Replace this with dynamic rows based on pending tasks */}
              {dashboardData.pendingTasks === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">No data available in table</td>
                </tr>
              ) : (
                // Map through the tasks and create rows dynamically
                // dashboardData.pendingTasks.map((task, index) => (
                //   <tr key={index}>
                //     <td>{index + 1}</td>
                //     <td>{task.project}</td>
                //     <td>{task.name}</td>
                //     <td>{task.duration}</td>
                //     <td>{task.status}</td>
                //     <td>{task.date}</td>
                //     <td>Manage</td>
                //   </tr>
                // ))
                null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
