// src/components/UpdateTaskProgress.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const UpdateTaskProgress = ({ taskId, onUpdate }) => {
  const location=useLocation()
  const id=location.state.id
  console.log(id)
  return (
    <div>
  
      <h1 style={{marginTop:"150px"}}>Create{id}</h1>
       </div>
  );
};

export default UpdateTaskProgress;
