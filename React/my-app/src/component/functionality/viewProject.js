import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { refreshObj } from '../Refreshobj';

export default function ViewProject() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [err, setErr] = useState('');
  const [eachProjTeam, setProjTeam] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // New state for controlling the view
  const obj = useSelector((state) => state.myobj.obj);
  const dispatch = useDispatch();
  let count=1;
  useEffect(() => {
    // Fetch projects
    fetch('https://localhost:7018/ETMS/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, [obj]);

  const handleAssignProject = (project) => {
    // Fetch employees
    fetch("https://localhost:7018/ETMS/unassignedManager?roleid=3")
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
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
        setErr("Assigned");
        setShowModal(false);
        refreshObj(dispatch, obj);
      })
      .catch((err) => {
        setErr('An error occurred. Please try again.');
        console.log(err);
      });
  };

  const handleViewTeam = (projectId) => {
    // Fetch project team
    fetch('https://localhost:7018/ETMS/team?pid=' + projectId)
      .then(response => response.json())
      .then(data => {
        setProjTeam(data);
        setViewMode('team');
      })
      .catch(error => console.error('Error fetching team:', error));
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }} className="bg-dark text-white text-center min-vh-100 p-0">
   
      {viewMode === 'list' ? (
        <>
          <h2>Project List</h2>
          <br />
          <table className="table table-striped text-white">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Project Title</th>
                <th>Description</th>
                <th>Assigned Manager</th>
                <th>Client Name</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Completed Date</th>
                <th>Assign Project</th>
                <th>View Team</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map(project => (
                  <tr key={project.id}>
                    <td>{count++}</td>
                    <td>{project.projectTitle}</td>
                    <td>{project.description}</td>
                    <td>{project.assignedToNavigation?project.assignedToNavigation.firstName:"Not Assigned"} {project.assignedToNavigation?.lastName}</td>
                    <td>{project.client.name}</td>
                    <td>{project.createdByNavigation.firstName} {project.createdByNavigation.lastName}</td>
                    <td>{project.createdDate}</td>
                    <td>{project.status}</td>
                    <td>{project.completedDate || 'N/A'}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAssignProject(project)}
                        disabled={project.assignedToNavigation }
                      >
                        Assign Project
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleViewTeam(project.id)}
                        disabled={!project.assignedToNavigation}
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
        </>
      ) : (
        <>
          <h2>Team for Project: {selectedProject?.projectTitle}</h2>
          <Button variant="secondary" onClick={handleBackToList}>
            Back to Project List
          </Button>
          <br /><br />
          <table className="table table-striped" style={{ backgroundColor: 'black', color: 'white' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Contact No</th>
                {/* Add other columns as needed */}
              </tr>
            </thead>
            <tbody>
              {eachProjTeam.length > 0 ? (
                eachProjTeam.map(member => (
                  <tr key={member.empId}>
                    <td>{member.emp.firstName} {member.emp.lastName}</td>
                    <td>{member.emp.login.role.role1}</td>
                    <td>{member.emp.desig.name}</td>
                    <td>{member.emp.emailId}</td>
                    <td>{member.emp.contactNo}</td>
                    {/* Add other columns as needed */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No team members available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

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
            disabled={!selectedEmployee}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
