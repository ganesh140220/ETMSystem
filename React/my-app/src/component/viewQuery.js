import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ViewQuery = () => {
  const location = useLocation();
  const taskId = location.state?.id; // Retrieve the task ID from location.state

  // Access the Redux store to get the task object
  const obj = useSelector(state => state.myobj.obj);
  
  // Find the specific task using the ID
  const task = obj?.tasks.find(task => task.id === taskId);

  // If the task is found, extract its queries
  const queries = task?.queries || [];

  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <h1 style={{ marginTop: "100px" }} className="text-center mb-4">Queries for Task: {task.title}</h1>
      
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Table hover responsive variant='info' size='lg' bordered>
          <thead style={{ backgroundColor: "olive" }}>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>View Solution</th>
            </tr>
          </thead>
          <tbody>
            {queries.length > 0 ? (
              queries.map(query => (
                <tr key={query.qid}>
                  <td>{query.title}</td>
                  <td>{query.queryText}</td>
                  <td>{query.status}</td>
                  <td>{query.createdDate}</td>
                  <td>
                    <Button
                      variant={query.status !== 'resolved' ? "secondary" : "success"}
                      as={Link}
                      to={`/viewSolution/${query.qid}`}
                      disabled={query.status !== 'resolved'}
                    >
                      View Solution
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No queries available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewQuery;
