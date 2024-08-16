import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [team, setEmployees] = useState([]);
  const [taskCreated, setTaskCreated] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7018/ETMS/teammembers')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching team members:', error));
  }, []);

  const associates = team.filter(t => t.emp.login.role.role1 === "Associate");

  const obj = useSelector(state => state.myobj.obj);
  const userRole = obj?.login?.role?.role1;

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const [task, setTask] = useState({
    id: 0,
    assignedTo: 0,
    createdDate: formatDate(new Date()),
    description: "",
    dueDate: "",
    projectId: obj.teamMembers[0].projectId,
    status: 'pending',
    title: "",
    completedDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTask((prevTask) => ({
        ...prevTask,
        createdDate: formatDate(new Date()),
      }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setHours(0, 0, 0, 0);
    setTask((prevTask) => ({
      ...prevTask,
      dueDate: formatDate(selectedDate),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);

        setTaskCreated(true);
        // navigate('/dashboard');
      } else {
        console.error('Error creating task:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="container">
        {taskCreated ? (
          <div className="text-center">
            <h2>Task has been Created</h2>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/${userRole}`)}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="title" className="form-label">Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="assignedTo" className="form-label">Assign To</label>
                <select
                  className="form-control"
                  id="assignedTo"
                  name="assignedTo"
                  value={task.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="0">Select an employee</option>
                  {associates.map((employee) => (
                    <option key={employee.emp.id} value={employee.emp.id}>
                      {employee.emp.firstName} {employee.emp.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Create Task</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
