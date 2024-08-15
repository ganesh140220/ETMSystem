import React, { useState, useEffect } from 'react';

export default function ViewProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7018/ETMS/projects') // Adjust the URL to match your API endpoint
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2>Project List</h2>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Client ID</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Completed Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.projectTitle}</td>
                <td>{project.description}</td>
                <td>{project.assignedTo}</td>
                <td>{project.clientId}</td>
                <td>{project.createdBy}</td>
                <td>{project.createdDate}</td>
                <td>{project.status}</td>
                <td>{project.completedDate || 'N/A'}</td> {/* Display 'N/A' if completedDate is empty */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No projects available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
