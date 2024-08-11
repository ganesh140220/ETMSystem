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
import CreateEmployee from './component/CreateEmp';
import About from './component/About';
import ViewEmployee from './component/viewEmp';
import ViewQuery from './component/viewQuery';
import CreateQuery from './component/createQuery';
import ViewProject from './component/viewProject';
import UpdateTaskProgress from './component/updateTaskProgress';
import ViewTeamMembers from './component/viewTeamMembers';
import ViewSolution from './component/viewSolutions';


const App = () => {
  

  return (
    <div className="App">
      <Navb/>
     
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ViewQuery" element={<ViewQuery />} />
          <Route path="/CreateQuery" element={<CreateQuery />} />
          <Route path="/ViewProject" element={<ViewProject />} />
          <Route path="/UpdateTaskProgress" element={<UpdateTaskProgress />} />
          <Route path="/ViewTeamMembers" element={<ViewTeamMembers />} />
          <Route path="/viewSolution/:queryId"element={<ViewSolution />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewEmp" element={<ViewEmployee />} />
          <Route path="/about" element={<About />} />
          <Route path="/createEmp" element={<CreateEmployee />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/MasterAdmin" element={<Admin />} />
          <Route path="/Manager" element={<Manager />} />
          <Route path="/Associate" element={<Employee />} />
          {/* Add other routes as needed */}
        </Routes>
        
     
    </div>
  );
}


export default App;
