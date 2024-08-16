import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ViewProject() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    // Fetch projects
    fetch('https://localhost:7018/ETMS/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch employees
    fetch("https://localhost:7018/ETMS/unassignedManager?roleid=3")
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleAssignProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleAssign = () => {
    const assignObj = {
      teamId: 0,
      empId: selectedEmployee,
      projectId: selectedProject.id
    };

    
    fetch('http://localhost:8080/assignProjectToManager', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignObj),
    })
      .then((response) => response.text())
      .then((data) => {
      setErr("Assigned")
      })
      .catch((err) => {
        setErr('An error occurred. Please try again.');
        console.log(err);
      });
    console.log(assignObj);


    // Perform the assignment logic here, e.g., send the data to the server
    
    setShowModal(false);
  };

  const handleViewTeam = (projectId) => {

    fetch()
    console.log('View team for project ID:', projectId);
  };

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
            <th>Assign Project</th> {/* New column for assigning the project */}
            <th>View Team</th> {/* New column for viewing the team */}
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
                <td>{project.completedDate || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAssignProject(project)}
                    disabled={project.status.toLowerCase() !== 'unassigned'}
                  >
                    Assign Project
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewTeam(project.id)}
                  >
                    View Team
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">No projects available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Assigning Project */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" value={selectedProject?.projectTitle || ''} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Assign To</Form.Label>
              <Form.Control
                as="select"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssign}
            disabled={!selectedEmployee} // Disable if no employee is selected
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
