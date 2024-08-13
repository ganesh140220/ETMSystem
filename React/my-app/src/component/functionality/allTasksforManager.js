import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const TaskList = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Get status from the query parameter
  const queryParams = new URLSearchParams(location.search);
  let status = queryParams.get('status');

  // Mapping status from the query parameter to the correct string
  if (status === "1") {
    status = "pending";
  } else if (status === "2") {
    status = "in progress";
  } else if (status === "3") {
    status = "completed";
  } else if (status === "4") {
    status = "all";
  }

  // Assume tasks are stored in the Redux store
  const proj = useSelector(state => state.myobj.projobj);
  const tasks = proj.tasks;

  useEffect(() => {
    // Filter tasks based on the status query parameter
    if (status && status !== "all") {
      const filtered = tasks.filter(task => task.status === status);
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [status, tasks]);

  // Function to handle search filtering
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAndSearchedTasks = filteredTasks.filter(task => {
    return (
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery) ||
      task.assignedToNavigation.firstName.toLowerCase().includes(searchQuery) ||
      task.assignedToNavigation.lastName.toLowerCase().includes(searchQuery) ||
      task.createdDate.toLowerCase().includes(searchQuery) ||
      task.dueDate.toLowerCase().includes(searchQuery) ||
      task.status.toLowerCase().includes(searchQuery) ||
      task.completedDate.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div style={{ marginTop: "70px" }}>
      <h2>Task List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Any Column..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {filteredAndSearchedTasks.length === 0 ? (
        <p>No tasks available for the selected status.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Created Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
              <th scope="col">Completed Date</th>
              <th scope="col">View Task Progress</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {filteredAndSearchedTasks.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.assignedToNavigation.firstName} {task.assignedToNavigation.lastName}</td>
                <td>{task.createdDate}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>{task.completedDate}</td>
                <td>
                  <Link to={`/tasks?id=${task.id}`}>View Progress</Link> {/* Updated link */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
