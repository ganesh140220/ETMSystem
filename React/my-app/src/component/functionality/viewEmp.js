import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export default function ViewEmp() {
  const [employees, setEmployees] = useState([]);
  const obj = useSelector((state) => state.myobj.obj);

  const fetchEmployees = useCallback(() => {
    fetch("https://localhost:7018/ETMS/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [obj, fetchEmployees]);

  const handleDisableToggle = (loginid, id, isActive) => {
    const endpoint = isActive ? "disableLogin" : "enableLogin";

    fetch(`http://localhost:8080/${endpoint}?loginid=${loginid}`)
      .then((response) => {
        if (response.ok) {
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
              emp.id === id ? { ...emp, login: { ...emp.login, active: isActive ? 0 : 1 } } : emp
            )
          );
        } else {
          console.error(`Failed to ${isActive ? "disable" : "enable"} employee`);
        }
      })
      .catch((error) => {
        console.error(`Error during ${isActive ? "disable" : "enable"} request:`, error);
      });
  };

  const isSpecialEmployee = (id) => id === 1; // Check if the employee is the one with id = 1

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Employee List</h2>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.emailId}</td>
                <td>{emp.address}</td>
                <td>
                  <button
                    onClick={() => handleDisableToggle(emp.loginId, emp.id, emp.login.active)}
                    className={`btn btn-${emp.login.active ? "danger" : "success"}`}
                    disabled={isSpecialEmployee(emp.id)} // Disable button if id = 1
                  >
                    {emp.login.active ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No employees available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
