import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshObj } from './Refreshobj';

const UpdateTaskProgress = ({ taskId, onUpdate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;
  const name = location.state.name;

  // Get user role from the global state or props (assuming useSelector for Redux)
  const empobj = useSelector(state => state.myobj.obj); // Adjust according to your state structure
  const dispatch=useDispatch()
  
  const obj = useSelector((state) => state.myobj.obj.login); // Adjust the path according to your state structure
  const userRole = obj.role.role1;

  // State variables for form fields and submission status
  const [description, setDescription] = useState('');
  const [workDonePercent, setWorkDonePercent] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission status

  // Function to format date as dd/mm/yyyy hh:mm:ss
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      id: 0,
      taskId: id,
      description: description,
      workDonePercent: Number(workDonePercent), // Ensure it's a number
      updateDate: formatDate(new Date())
    };
  
    fetch('http://localhost:8080/api/task-progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text)
    .then(result => {
      console.log(result);
      if (onUpdate) {
        onUpdate(data);
      }
      setDescription('');
      setWorkDonePercent('');
      setSubmitted(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log(data); // You can replace this with your actual submission logic, e.g., API call

    // Optional: Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(data);
    }

    // Clear the form fields
    setDescription('');
    setWorkDonePercent('');

    // Set submission status to true
    setSubmitted(true);
  };

  // Handle work done percentage input change
  const handleWorkDonePercentChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 100) {
      setWorkDonePercent(value);
    } else if (value < 0) {
      setWorkDonePercent(0);
    } else if (value > 100) {
      setWorkDonePercent(100);
    }
  };

  // Handle navigation to dashboard
  const handleNavigateToDashboard = () => {
    refreshObj(dispatch,obj)
    navigate(`/${userRole}`); // Navigate to the dashboard based on user role
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '50px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1 style={{ color: 'gold' }}>Task Has Been Updated</h1>
              <Button variant="primary" onClick={handleNavigateToDashboard} style={{ marginTop: '20px' }}>
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <h1 style={{ marginTop: "50px", marginBottom:"30px",textAlign: "center", color: "gold" }}>
                Update Task Progress for Task: {name}
              </h1>
              <Form onSubmit={handleSubmit} style={{ marginTop: "50px", maxWidth: '500px', margin: 'auto', backgroundColor: "grey", color: "black", padding: '20px' }}>
                <Form.Group controlId="formDescription">
                  <Form.Label><h4 style={{ marginTop: '10px' }}>Description</h4></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </Form.Group>

                <Form.Group controlId="formWorkDonePercent">
                  <Form.Label><h4>Work Done Percentage</h4></Form.Label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="Enter percentage"
                      value={workDonePercent}
                      onChange={handleWorkDonePercentChange}
                      style={{ flexGrow: 1 }}
                    />
                    <span style={{ marginLeft: '10px' }}>{workDonePercent}%</span>
                  </div>
                </Form.Group>

                <Button style={{ marginTop: "10px" }} variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default UpdateTaskProgress;
