import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AssociateQueries = () => {
  const proj = useSelector(state => state.myobj.projobj);
  const obj = useSelector(state => state.myobj.obj);
  const tasks = proj.tasks || [];

  const [queries, setQueries] = useState([]);
  
  const [employees, setEmployees] = useState([]);
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [solution, setSolution] = useState('');

  useEffect(() => {
    // Fetch queries from API
    fetch('https://localhost:7018/ETMS/queries?projid='+proj.id)
      .then(response => response.json())
      .then(data => setQueries(data))
      .catch(error => console.error('Error fetching queries:', error));

  }, []);

  useEffect(() => {
    fetch('https://localhost:7018/ETMS/employees')
      .then(response => response.json())
      .then(data => setEmployees(data));
  }, []);

  const handleShowSolutionForm = (query) => {
    setSelectedQuery(query);
    setShowSolutionForm(true);
  };

  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
  };

  const getCurrentFormattedDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmitSolution = () => {
    if (selectedQuery) {
      const solvobj = {
        sid: 0,
        createdDate: getCurrentFormattedDate(),
        description: solution,
        qid: selectedQuery.qid,
        solvedBy: obj.id
      };

      // Here, you would typically send the solution to your API or state
      console.log(solvobj);

      // Hide the solution form
      setShowSolutionForm(false);

      // Optionally, you can clear the solution or update the query status here
      setSolution('');
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="container mt-4">
        <h2 className="mb-4">Queries of Associates</h2>

        {/* Table for queries */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Query Title</th>
              <th>Created Date</th>
              <th>Description</th>
              <th>Raised By</th>
              <th>Status</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            {queries.length > 0 ? (
              queries.map((query, index) => {
                // Find the task associated with the query
                const task = tasks.find(task => task.id === query.qid);
                const emp = employees.find(emp => emp.id === query.raisedBy);
                return (
                  <tr key={query.qid}>
                    <td>{index + 1}</td>
                    <td>{task ? task.title : 'Task not found'}</td>
                    <td>{query.title}</td>
                    <td>{query.createdDate}</td>
                    <td>{query.queryText}</td>
                    <td>{emp ? emp.firstName + " " + emp.lastName : 'Emp not found'}</td>
                    <td>{query.status}</td>
                    <td>
                     
                        <Button variant="primary" onClick={() => handleShowSolutionForm(query)} disabled={query.status=="resolved"}>
                          Resolve Query
                        </Button>
                      
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No queries available</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Solution Modal */}
        <Modal show={showSolutionForm} onHide={() => setShowSolutionForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Solution for Query {selectedQuery?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formSolution">
                <Form.Label>Solution</Form.Label>
                <Form.Control
                  as="textarea"
                  value={solution}
                  onChange={handleSolutionChange}
                  rows={5}
                  placeholder="Enter solution here..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSolutionForm(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitSolution}>
              Submit Solution
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AssociateQueries;
