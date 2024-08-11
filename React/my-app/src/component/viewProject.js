// src/components/ViewProject.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewProject = ({ projectId }) => {
  return (
    <Button variant="link" as={Link} to={`/viewProject/${projectId}`}>
      View Project
    </Button>
  );
};

export default ViewProject;
