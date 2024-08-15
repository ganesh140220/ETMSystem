import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Modal, Row, Col } from 'react-bootstrap';

const CreateTeamMember = () => {
  // Example emp object array
  const [emp, setEmp] = useState([]);

  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => { 
    // Fetch employees
    fetch("https://localhost:7018/ETMS/unassignedManager?roleid=4")
      .then(response => response.json())
      .then(data => {
        setEmp(data);
      })
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
    const selectedMemberIds = Array.from(selectedMembers);
    console.log('Selected members:', selectedMemberIds);
    setShowConfirmation(true);
  };

  const handleConfirmCreate = () => {
    // Confirm creation logic
    setShowConfirmation(false);
    setSelectedMembers(new Set());
    alert('Team created successfully!');
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <div className="container mt-4">
        <h2 className="mb-4">Team Members</h2>

        {/* Table for team members */}
        {emp && emp.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Select</th> {/* Checkbox column */}
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
          <div className="text-center mt-4">No record found</div>
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
