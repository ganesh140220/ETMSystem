import React, { useState } from 'react';
import { Col, Container, Row, Table, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ViewTeamMembers = ({ projectId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get the team members from the Redux store
  const team = useSelector(state => state.myobj.teamobj);

  // Extract and map team members with role and designation details
  console.log('Team Data:', team);
  let filteredMembers;
  
   filteredMembers = Array.isArray(team)?team.map(member => ({
    ...member.emp,
    roleName: member.emp.login.role ? member.emp.login.role.role1 : 'N/A',
    desigName: member.emp.desig ? member.emp.desig.name : 'N/A'
  })):null; 

  // Define a sort order for roles
  const roleOrder = {
    'MasterAdmin': 1,
    'Admin': 2,
    'Manager': 3,
    'Associate': 4,
    'N/A': 5 // Default for roles that don't fit into the specific categories
  };

  // Sort members based on the defined role order
  const sortedMembers = Array.isArray(team)?filteredMembers.sort((a, b) => {
    const roleA = roleOrder[a.roleName] || 5;
    const roleB = roleOrder[b.roleName] || 5;

    return roleA - roleB;
  }):null;

  // Filter members based on the search query
  const searchLower = searchQuery.toLowerCase();
  const filteredAndSearchedMembers = Array.isArray(team)?sortedMembers.filter(member => 
    member.firstName.toLowerCase().includes(searchLower) ||
    member.lastName.toLowerCase().includes(searchLower) ||
    member.emailId.toLowerCase().includes(searchLower) ||
    member.roleName.toLowerCase().includes(searchLower) ||
    member.desigName.toLowerCase().includes(searchLower)
  ):null;

  return (
    <div className="bg-dark text-white text-center min-vh-100 p-0">
      <Container fluid>
        <div style={{ paddingTop: '90px' }}>
          <h1>Team Members for Project ID: {projectId!=undefined||projectId!=null?projectId:"No Project Assigned"}</h1>
          <Row>
            <Col md={10} className="mx-auto text-center" style={{ marginTop: "20px" }}>
              <Form.Control
                type="text"
                placeholder="Search by name, email, role, or designation"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '400px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
              />
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Table hover responsive variant='info' size='lg' bordered>
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Designation</th>
                      <th>Email</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSearchedMembers && filteredAndSearchedMembers.length > 0 ? (
                      filteredAndSearchedMembers.map(member => (
                        <tr key={member.id}>
                          <td>{member.firstName} {member.lastName}</td>
                          <td>{member.roleName}</td>
                          <td>{member.desigName}</td>
                          <td>{member.emailId}</td>
                          <td>{member.contactNo}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No members found</td>
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

export default ViewTeamMembers;
