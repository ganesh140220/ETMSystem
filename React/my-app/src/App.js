

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';  
import Admin from './component/Admin';  
import Manager from './component/Manager';  
import Employee from './component/Employee';  

function App() {
  return (
    
    <Router>
      <div className="App">
      <Login />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
