import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Modal, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CreateTeamMember = () => {
  const [emp, setEmp] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Retrieve projectId from Redux store
  const projobj = useSelector((state) => state.myobj.projobj);
  const projectId = projobj?.id;

  useEffect(() => {
    // Fetch employees
    fetch("https://localhost:7018/ETMS/unassignedManager?roleid=4")
      .then(response => response.json())
      .then(data => setEmp(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleSelectMember = (id) => {
    setSelectedMembers(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleCreateTeam = () => {
    if (selectedMembers.size === 0) {
      alert('Please select at least one member to create a team.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmCreate = () => {
    const selectedMemberIds = Array.from(selectedMembers);

    // Prepare the request body
    const requestBody = selectedMemberIds.map(empId => ({
      teamId: 0,
      empId: empId,
      projectId: projectId, // Retrieved from Redux store
    }));

    console.log('Request Body:', requestBody);
    fetch('http://localhost:8080/createTeam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then(data => {
      setShowConfirmation(false);
      setSelectedMembers(new Set());
      alert('Team members assigned successfully!');
    })
    .catch(error => {
      console.error('Error assigning team members:', error);
      alert('Error assigning team members. Please try again.');
    });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <div className="container mt-4">
        <h2 className="mb-4">Team Members</h2>

        {/* Table for team members */}
        {emp.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Select</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {emp.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedMembers.has(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                    />
                  </td>
                  <td>{member.firstName}</td>
                  <td>{member.lastName}</td>
                  <td>{member.email}</td>
                  <td>{member.designation}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center mt-4">No records found</div>
        )}

        {/* Button Row */}
        <Row className="mt-4">
          <Col className="text-center">
            <Button
              variant="outline-primary"
              onClick={handleCreateTeam}
              disabled={emp.length === 0} // Disable button if no records
            >
              Create Team
            </Button>
          </Col>
        </Row>

        {/* Confirmation Modal */}
        <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Creation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to create the team with the selected members?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmation}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmCreate}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default CreateTeamMember;
