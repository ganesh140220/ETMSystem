// src/components/ViewTeamMembers.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ViewTeamMembers = ({ projectId }) => {

  const team = useSelector(state => state.myobj.teamobj);
  const filteredMembers = team.map(member => member.emp);

  return (
    <div>
      <h1>Team Members for Project ID: {projectId}</h1>
      <ul>
        {filteredMembers.map(member => (
          <li key={member.id}>
            <h2>{member.firstName} {member.lastName}</h2>
            <p>Email: {member.emailId}</p>
            <p>Contact: {member.contactNo}</p>
            <p>Address: {member.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTeamMembers;
