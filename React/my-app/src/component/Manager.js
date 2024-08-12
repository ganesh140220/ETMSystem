// src/components/ManagerProjectsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ManagerProjectsPage = () => {
  const navigate = useNavigate();

  // Hardcoded data for testing
  const obj = {
    projects: [
      { id: 1, name: 'Project Alpha', status: 'ongoing' },
      { id: 2, name: 'Project Beta', status: 'completed' },
      { id: 3, name: 'Project Gamma', status: 'not started' },
      { id: 4, name: 'Project Delta', status: 'ongoing' },
      { id: 5, name: 'Project Epsilon', status: 'completed' }
    ]
  };

  const [counts, setCounts] = useState({
    ongoing: 0,
    completed: 0,
    notStarted: 0
  });
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = () => {
      const newCounts = {
        ongoing: 0,
        completed: 0,
        notStarted: 0
      };

      if (obj && obj.projects) {
        obj.projects.forEach(project => {
          if (project.status === 'ongoing') {
            newCounts.ongoing += 1;
          } else if (project.status === 'completed') {
            newCounts.completed += 1;
          } else if (project.status === 'not started') {
            newCounts.notStarted += 1;
          }
        });
      }

      setCounts(newCounts);
    };

    fetchProjects();
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = () => {
    const projects = filter === 'all' ? obj.projects : obj.projects.filter(project => project.status === filter);
    return projects.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '90px' }}>
          <h2 className="text-center mb-3 text-warning">Project Status:</h2>
          <Row className='mt-1'>
            <Col md={4} className="mx-auto">
              <div className="border p-3 rounded shadow-sm bg-danger text-black text-center" style={{ minHeight: '120px' }}>
                <div className='mt-4'>
                  <Button onClick={() => handleFilterChange('not started')} className='text-black' style={{ backgroundColor: "transparent", border: "0" }}>
                    <h3><u>Not Started</u> : {counts.notStarted}</h3>
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={4} className="mx-auto">
              <div className="border p-3 rounded shadow-sm bg-info text-black text-center" style={{ minHeight: '120px' }}>
                <div className='mt-4'>
                  <Button onClick={() => handleFilterChange('ongoing')} className='text-black' style={{ backgroundColor: "transparent", border: "0" }}>
                    <h3><u>Ongoing</u> : {counts.ongoing}</h3>
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={4} className="mx-auto">
              <div className="border p-3 rounded shadow-sm bg-success text-black text-center" style={{ minHeight: '120px' }}>
                <div className='mt-4'>
                  <Button onClick={() => handleFilterChange('completed')} className='text-black' style={{ backgroundColor: "transparent", border: "0" }}>
                    <h3><u>Completed</u> : {counts.completed}</h3>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={8} className="mx-auto text-center">
              <h2 className="text-center mb-4 text-warning">My Projects</h2>
              <Row>
                <Col md={10}>
                  <div className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{ width: "400px" }}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="mb-3" style={{ marginLeft: "60px" }}>
                    <Button variant="secondary" onClick={() => handleFilterChange('all')}>Show All</Button>
                  </div>
                </Col>
              </Row>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <Table hover responsive variant='info' size='lg' bordered>
                  <thead>
                    <tr style={{ position: "sticky", top: "0", backgroundColor: "olive", height: "50px" }}>
                      <th>Project Name</th>
                      <th>Status</th>
                      <th>Project Details</th>
                      <th>Update Progress</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj && filteredProjects() && filteredProjects().length > 0 ? (
                      filteredProjects().map(project => (
                        <tr key={project.id}>
                          <td><h6 style={{ marginTop: "10px" }}>{project.name}</h6></td>
                          <td style={{ color: project.status === 'not started' ? 'Red' : project.status === 'completed' ? 'green' : 'orange' }}>
                            <h6 style={{ marginTop: "10px" }}>{project.status}</h6>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/ProjectDetails", { state: { project } })}
                              style={{ color: 'blue' }}
                            >
                              Details
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/UpdateProjectProgress", { state: { id: project.id, name: project.name } })}
                              disabled={project.status === 'completed'}
                              style={{ color: project.status === 'completed' ? 'grey' : 'blue' }}
                            >
                              Update
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/ViewProjectDetails", { state: { id: project.id, name: project.name } })}
                              style={{ color: 'blue' }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No projects available</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ManagerProjectsPage;
