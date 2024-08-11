// src/components/ViewTeamMembers.js
import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ViewTeamMembers = ({ projectId }) => {
  const team = useSelector(state => state.myobj.teamobj);

  // Extract and map team members with role and designation details
  const filteredMembers = team.map(member => ({
    ...member.emp,
    roleName: member.role ? member.role.role1 : 'N/A',
    desigName: member.emp.desig ? member.emp.desig.name : 'N/A'
  }));

  // Define a sort order for roles
  const roleOrder = {
    'MasterAdmin': 1,
    'Admin': 2,
    'Manager': 3,
    'Associate': 4,
    'N/A': 5 // Default for roles that don't fit into the specific categories
  };

  // Sort members based on the defined role order
  const sortedMembers = filteredMembers.sort((a, b) => {
    const roleA = roleOrder[a.roleName] || 5;
    const roleB = roleOrder[b.roleName] || 5;

    return roleA - roleB;
  });

  return (
    <div>
      <h1 style={{ marginTop: "100px" }}>Team Members for Project ID: {projectId}</h1>
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
          {sortedMembers.map(member => (
            <tr key={member.id}>
              <td>{member.firstName} {member.lastName}</td>
              <td>{member.roleName}</td>
              <td>{member.desigName}</td>
              <td>{member.emailId}</td>
              <td>{member.contactNo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTeamMembers;
