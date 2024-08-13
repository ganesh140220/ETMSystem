import React, { useState, useEffect } from 'react';

export default function ViewEmp() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
 
    fetch('https://localhost:7018/ETMS/employees')
       .then(response => response.json())
      .then(data => setEmployees(data));
    

  }, []);

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2>Employee List</h2><br></br>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>last Name</th>
            <th>Contact Number</th>
            <th>Email ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.contactNo}</td>
                <td>{emp.emailId}</td>
                <td>{emp.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No employees available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
