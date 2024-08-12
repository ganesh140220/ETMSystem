// src/components/EmployeeTasksPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Table, Button, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmployeeTasksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = useSelector(state => state.myobj.obj);
  const proj = useSelector(state => state.myobj.projobj);
  const team = useSelector(state => state.myobj.teamobj);

  const manager = team.find(r => r.emp.id === proj.assignedTo);

  const [counts, setCounts] = useState({
    pending: 0,
    completed: 0,
    inProgress: 0
  });
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const newCounts = {
        pending: 0,
        completed: 0,
        inProgress: 0
      };

      if (obj && obj.tasks) {
        obj.tasks.forEach(task => {
          if (task.status === 'pending') {
            newCounts.pending += 1;
          } else if (task.status === 'completed') {
            newCounts.completed += 1;
          } else if (task.status === 'in progress') {
            newCounts.inProgress += 1;
          }
        });
      }

      setCounts(newCounts);
    };

    fetchTask();
  }, [obj, dispatch]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getHighestWorkDonePercent = (task) => {
    if (task.taskProgresses && task.taskProgresses.length > 0) {
      return Math.max(...task.taskProgresses.map(progress => progress.workDonePercent));
    }
    return 0;
  };

  const filteredTasks = () => {
    const tasks = filter === 'all' ? obj.tasks : obj.tasks.filter(task => task.status === filter);
    return tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '90px' }}>
          <div>
            {proj && proj.projectTitle && (
              <>
                <h5 className="mb-4" style={{ color: "wheat" }}>
                  Project Name: {proj.projectTitle}
                </h5>
                {manager && (
                  <h5 className="mb-1" style={{ color: "wheat" }}>
                    Manager Name: {manager.emp.firstName} {manager.emp.lastName}
                  </h5>
                )}
              </>
            )}
            <h2 className="text-center mb-3 text-warning">Task Status:</h2>
            <Row className='mt-1'>
              <Col md={4} className="mx-auto">
                <div className="border p-3 rounded shadow-sm bg-danger text-black text-center" style={{ minHeight: '120px' }}>
                  <div className='mt-4'>
                    <Button onClick={() => handleFilterChange('pending')} className='text-black' style={{ backgroundColor: "transparent", border: "0" }}>
                      <h3><u>Pending</u> : {counts.pending}</h3>
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={4} className="mx-auto">
                <div className="border p-3 rounded shadow-sm bg-info text-black text-center" style={{ minHeight: '120px' }}>
                  <div className='mt-4'>
                    <Button onClick={() => handleFilterChange('in progress')} className='text-black' style={{ backgroundColor: "transparent", border: "0" }}>
                      <h3><u>In Progress</u> : {counts.inProgress}</h3>
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
          </div>

          <Row className="mt-4">
            <Col md={11} className="mx-auto text-center">
              <h2 className="text-center mb-4 text-warning">My Tasks</h2>
              <Row>
                <Col md={10}>
                  <div className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{ width: "400px" }}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="mb-3" style={{ marginLeft: "120px" }}>
                    <Button variant="secondary" onClick={() => handleFilterChange('all')}>Show All</Button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={11} className='mx-auto text-center'>
              <div style={{ maxWidth: '1400px',maxHeight: '200px', overflowX: 'auto', margin: '0 auto' }}>
                <Table hover responsive variant='info' size='lg' bordered>
                  <thead>
                    <tr style={{ position: "sticky", top: "0", backgroundColor: "olive", height: "50px" }}>
                      <th style={{ width: '25 %' }}>Task Title</th>
                      <th style={{ width: '14%' }}>Status</th>
                      <th style={{ width: '16%' }}>Task Progress</th>
                      <th style={{ width: '11%' }}>Update Task</th>
                      <th style={{ width: '11%' }}>Create Query</th>
                      <th style={{ width: '11%' }}>View Query</th>
                      <th style={{ width: '11%' }}>Task Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj && filteredTasks() && filteredTasks().length > 0 ? (
                      filteredTasks().map(task => (
                        <tr key={task.id}>
                          <td><h6 style={{ marginTop: "10px" }}>{task.title}</h6></td>
                          <td style={{ color: task.status === 'pending' ? 'Red' : task.status === 'completed' ? 'green' : 'orange' }}>
                            <h6 style={{ marginTop: "10px" }}>{task.status}</h6>
                          </td>
                          <td>
                            <ProgressBar
                              now={getHighestWorkDonePercent(task)}
                              label={`${getHighestWorkDonePercent(task)}%`}
                              variant="success"
                              style={{ height: '20px' ,marginTop:"10px",marginLeft:"15px",marginRight:"15px"}}
                            />
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/UpdateTaskProgress", { state: { id: task.id, name: task.title } })}
                              disabled={task.status === 'completed'}
                              style={{ color: task.status === 'completed' ? 'grey' : 'blue' }}
                            >
                              Update
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/CreateQuery", { state: { id: task.id, name: task.title } })}
                              disabled={task.status === 'completed'}
                              style={{ color: task.status === 'completed' ? 'grey' : 'blue' }}
                            >
                              Create
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/ViewQuery", { state: { id: task.id, name: task.title } })}
                              style={{ color: "blue" }}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/TaskDetails", { state: { task } })}
                              style={{ color: 'blue' }}
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No tasks available</td>
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

export default EmployeeTasksPage;
