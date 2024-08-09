import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './component/Home';
import Login from './component/login';
import Admin from './component/Admin';
import Manager from './component/Manager';
import Employee from './component/Employee';
import Navb from './component/Navb';
import { useSelector } from 'react-redux';


const App = () => {
  

  return (
    <div className="App">
      <Navb/>
     
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/employee" element={<Employee />} />
          {/* Add other routes as needed */}
        </Routes>
        
     
    </div>
  );
}


export default App;
