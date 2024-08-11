import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css'; // Ensure correct import path
import { useSelector } from 'react-redux';

const Manager = () => {
  
  return (
    <div className="bg-white d-flex align-items-center justify-content-center min-vh-100">
    <Container fluid>
    <div className="admin-container">
       {/* Your admin-specific content goes here */}

       <h1>All Projects</h1></div>
    </Container>
    </div>
  );
};

export default Manager;
