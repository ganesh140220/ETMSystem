import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskObj } from './slicefile';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeTasksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = useSelector(state => state.myobj.obj);
  const proj = useSelector(state => state.myobj.projobj);
  const team = useSelector(state => state.myobj.teamobj);

  // Find the manager based on assignedTo
  const manager = team.find(r => r.emp.id === proj.assignedTo);

  // Debug: Print the manager object to verify its structure
  console.log('Manager:', manager);
  console.log(team[0].emp.id);
  const [counts, setCounts] = useState({
    pending: 0,
    completed: 0,
    inProgress: 0
  });
  const [filter, setFilter] = useState('all'); // State to manage the current filter

  useEffect(() => {
    const fetchTask = async () => {
      // Calculate task counts
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

  const handleUpdateTask = (taskId) => {
    // Placeholder for update task logic
    console.log(`Update task progress for task ID: ${taskId}`);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredTasks = () => {
    if (filter === 'all') {
      return obj.tasks;
    }
    return obj.tasks.filter(task => task.status === filter);
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '90px' }}>
          <div>
            {proj && proj.projectTitle && (
              <>
                <h5 className=" mb-4 " style={{color:"wheat"}}>
                  Project Name: {proj.projectTitle}
                </h5>
                {manager && (
                  <h5 className="mb-1 "style={{color:"wheat"}}>
                    Manager Name: {manager.emp.firstName} {manager.emp.lastName}{/* Ensure firstName is the correct field */}
                  </h5>
                )}
              </>
            )}
            <h2 className="text-center mb-3 text-warning">Task Status:</h2>
            <Row className='mt-1'>
              <Col md={4} className="mx-auto">
                <div className="border p-3 rounded shadow-sm bg-danger text-black text-center" style={{ minHeight: '120px' }}>
                  <div className='mt-4'>
                    <Button onClick={() => handleFilterChange('pending')} className='text-black' style={{backgroundColor:"transparent",border:"0"}} >
                      <h3><u>Pending</u> : {counts.pending}</h3>
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={4} className="mx-auto">
                <div className="border p-3 rounded shadow-sm bg-info text-black text-center" style={{ minHeight: '120px' }}>
                  <div className='mt-4'>
                    <Button onClick={() => handleFilterChange('in progress')} className='text-black' style={{backgroundColor:"transparent",border:"0"}} >
                      <h3><u>In Progress</u> : {counts.inProgress}</h3>
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={4} className="mx-auto">  
                <div className="border p-3 rounded shadow-sm bg-success text-black text-center" style={{ minHeight: '120px' }}>
                  <div className='mt-4'>
                    <Button onClick={() => handleFilterChange('completed')} className='text-black' style={{backgroundColor:"transparent",border:"0"}} >
                      <h3><u>Completed</u> : {counts.completed}</h3>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            <Col md={8} className="mx-auto text-center" style={{ marginTop: "20px" }}>
              <h2 className="text-center mb-4 text-warning">My Tasks</h2>
              <div className="mb-3">
                <Button variant="secondary" onClick={() => handleFilterChange('all')}>Show All</Button>
              </div>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <Table hover responsive variant='info' size='lg' bordered>
                  
                    <tr style={{position:"sticky", top: "0", backgroundColor: "olive", height: "50px" }}>
                      <th>Task Title</th>
                      <th>Status</th>
                      <th>Task Progress</th>
                      <th>View Query</th>
                      <th>Create Query</th>
                    </tr>
                  
                  <tbody>
                    {obj && filteredTasks() && filteredTasks().length > 0 ? (
                      filteredTasks().map(task => (
                        <tr key={task.id}>
                          <td><h6 style={{ marginTop: "10px" }}>{task.title}</h6></td>
                          <td style={{color: task.status === 'pending' ? 'Red' : task.status === 'completed' ? 'green' : 'orange'}}>
                            <h6 style={{ marginTop: "10px" }}>{task.status}</h6>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/UpdateTaskProgress", { state: { id: task.id } })}
                            >
                              Update
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/ViewQuery", { state: { id: task.id } })}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => navigate("/CreateQuery", { state: { id: task.id } })}
                            >
                              Create
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No tasks available</td>
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
}

export default EmployeeTasksPage;
