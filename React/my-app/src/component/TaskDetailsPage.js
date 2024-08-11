import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TaskDetailsPage = () => {
  const location = useLocation();
  const proj = useSelector(state => state.myobj.projobj);
  const { task } = location.state || {}; // Get the task from navigation state
  
  // State to manage sorting order
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  // Determine background color based on task status
  const getBackgroundColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'completed':
        return 'green';
      case 'in progress':
        return 'gold';
      default:
        return 'lightgray'; // Default color if status is unknown
    }
  };

  // Function to sort taskProgresses based on workDonePercent
  const sortedTaskProgresses = task?.taskProgresses?.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.workDonePercent - b.workDonePercent;
    } else {
      return b.workDonePercent - a.workDonePercent;
    }
  }) || [];

  // Toggle sort order
  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '20px' }}>
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <div
                className="p-4 rounded"
                style={{ backgroundColor: task ? getBackgroundColor(task.status) : 'lightgray' }}
              >
                <h2 className="text-center mb-4 text-black">Task Details</h2>
                {task ? (
                  <>
                    <ListGroup>
                      <ListGroup.Item><strong>Title:</strong> {task.title}</ListGroup.Item>
                      <ListGroup.Item><strong>Created Date:</strong> {task.createdDate}</ListGroup.Item>
                      <ListGroup.Item><strong>Description:</strong> {task.description}</ListGroup.Item>
                      <ListGroup.Item><strong>Due Date:</strong> {task.dueDate}</ListGroup.Item>
                      <ListGroup.Item><strong>Project Name:</strong> {proj.projectTitle}</ListGroup.Item>
                      <ListGroup.Item><strong>Status:</strong> {task.status}</ListGroup.Item>
                    </ListGroup>
                    {/* Render the table of taskProgresses */}
                    <div className="mt-4">
                      <h3 className="text-center mb-4 text-black">Task Progresses</h3>
                      <Button
                        variant="info"
                        onClick={handleSortToggle}
                        className="mb-3"
                      >
                        Sort by Work Done ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                      </Button>
                      <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        <Table hover responsive variant='info' size='sm' bordered>
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Update Date</th>
                              <th>Work Done (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedTaskProgresses.length > 0 ? (
                              sortedTaskProgresses.map(progress => (
                                <tr key={progress.id}>
                                  <td>{progress.description}</td>
                                  <td>{progress.updateDate}</td>
                                  <td>{progress.workDonePercent}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center">No progress records available</td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center">No task details available</p>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default TaskDetailsPage;
