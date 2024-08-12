import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row, Table, Button } from 'react-bootstrap';

const ViewSolution = () => {
  const { queryId } = useParams(); // Access the queryId from the URL
  const navigate = useNavigate(); // Hook for programmatic navigation
  const obj = useSelector(state => state.myobj.obj);
  const teamMembers = useSelector(state => state.myobj.teamobj);

  // Find the specific query using the queryId
  const task = obj?.tasks.find(task => 
    task.queries.some(query => query.qid === parseInt(queryId, 10))
  );
  const query = task?.queries.find(query => query.qid === parseInt(queryId, 10));

  // Find the member who solved the query
  const member = query?.solutions[0] 
    ? teamMembers.find(member => member.emp.id === query.solutions[0].solvedBy)
    : null;
  const solvedEmpName = member ? `${member.emp.firstName} ${member.emp.lastName}` : 'N/A';

  // Handler for the "Back to Queries" button
  const handleBackToQueries = () => {
    navigate('/ViewQuery',{ state: { id: task.id, name: task.title } }); // Redirect to the ViewQuery page
  };

  return (
    <div className="bg-success text-white min-vh-100 p-4">
      <h1 style={{ marginTop: "100px", color: "black" }} className="text-center mb-4">Solution for Query: {query?.title || 'N/A'}</h1>

      <div>
        <Row>
          <Col md={8} style={{ marginLeft: "250px" }}>
            {query && query.solutions.length > 0 ? (
              <Table striped bordered hover variant="dark" className="text-white">
                <tbody>
                  <tr>
                    <td><strong>Query Text:</strong></td>
                    <td style={{ color: "red" }}><b>{query.queryText}</b></td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>{query.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Created Date:</strong></td>
                    <td>{new Date(query.createdText).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Solution:</strong></td>
                    <td style={{ color: "lime" }}><b>{query.solutions[0].description}</b></td>
                  </tr>
                  <tr>
                    <td><strong>Resolved Date:</strong></td>
                    <td>{new Date(query.solutions[0].createdDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Resolved By:</strong></td>
                    <td>{solvedEmpName}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>No query or solution found for the provided ID.</p>
            )}
            <Button
              variant="primary"
              onClick={handleBackToQueries}
              style={{ marginTop: "20px" }}
            >
              Back to Queries
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewSolution;
