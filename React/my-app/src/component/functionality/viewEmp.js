import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ViewEmp() {
  const [employees, setEmployees] = useState([]);
  const obj = useSelector((state) => state.myobj.obj);
  useEffect(() => {
    fetchEmployees();
  }, [obj]);

  const fetchEmployees = () => {
    fetch("https://localhost:7018/ETMS/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/deleteEmployee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Successfully deleted employee with id: ${id}`);
          fetchEmployees(); 
        } else {
          console.error(`Failed to delete employee with id: ${id}`);
        }
      })
      .catch((error) => {
        console.error("Error during deletion:", error);
      });
  };

  const handleDisableToggle = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, disabled: !emp.disabled } : emp
      )
    );
  };

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
            <th>Delete</th>
            <th>Disable</th>
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
                    onClick={() => handleDelete(emp.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    Remove
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDisableToggle(emp.id)}
                    className={`btn btn-${emp.disabled ? "success" : "danger"}`}
                  >
                    {emp.disabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No employees available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}