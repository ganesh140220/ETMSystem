import React from 'react';
import { useSelector } from 'react-redux';

const MyProject = () => {
  const proj = useSelector(state => state.myobj.projobj);
  const clientobj = useSelector(state => state.myobj.clientobj);

  if (!proj || proj.status === 400) {
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#343a40', // Dark background color
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>No Project Assigned</h2>
      </div>
    );
  }

  const client = clientobj.find(client => client.id === proj.clientId);

  return (
    <div style={{marginTop:"200px"}}>
        <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '100px',
      backgroundColor: '#343a40', // Dark background color
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '0 auto', // Center the component horizontally
      textAlign: 'left' // Align text to the left within the content
    }}>
      <h2>Project Details</h2>
      <ul style={{ 
        listStyleType: 'none', 
        padding: 0,
        margin: 0 // Remove default margins
      }}>
        <li><strong>Project ID:</strong> {proj.id}</li>
        <li><strong>Assigned To:</strong> {proj.assignedTo}</li>
        <li><strong>Client Name:</strong> {client ? client.name : "Client not found"}</li>
        <li><strong>Created By:</strong> {proj.createdBy}</li>
        <li><strong>Created Date:</strong> {proj.createdDate}</li>
        <li><strong>Completed Date:</strong> {proj.completedDate ? proj.completedDate : "Not Completed"}</li>
        <li><strong>Description:</strong> {proj.description}</li>
        <li><strong>Project Title:</strong> {proj.projectTitle}</li>
        <li><strong>Status:</strong> {proj.status}</li>
      </ul>
    </div></div>
  );
};

export default MyProject;
