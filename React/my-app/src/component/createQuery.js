// src/components/CreateQuery.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const CreateQuery = () => {
  const location=useLocation()
  const id=location.state.id
  console.log(id)
  return (
    <div>
  
      <h1 style={{marginTop:"150px"}}>Create{id}</h1>
      
      
  
    </div>
  );
};

export default CreateQuery;
