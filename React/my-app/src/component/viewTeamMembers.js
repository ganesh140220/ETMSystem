// src/components/ViewTeamMembers.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewTeamMembers = ({ projectId }) => {
  return (
    <Button variant="link" as={Link} to={`/viewTeamMembers/${projectId}`}>
      View Team Members
    </Button>
  );
};

export default ViewTeamMembers;
