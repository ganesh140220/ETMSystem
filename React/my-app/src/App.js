import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/login';
import Admin from './component/Admin';
import Manager from './component/Manager';
import Employee from './component/Employee';
import Navb from './component/Navb';
import CreateEmployee from './component/CreateEmp';
import About from './component/About';
import ViewQuery from './component/viewQuery';
import CreateQuery from './component/createQuery';
import ViewProject from './component/functionality/viewProject';
import UpdateTaskProgress from './component/updateTaskProgress';
import ViewTeamMembers from './component/viewTeamMembers';
import ViewSolution from './component/viewSolutions';
import TaskDetailsPage from './component/TaskDetailsPage';
import PersonalDetails from './component/PersonalDetails';
import ViewEmp from './component/functionality/viewEmp';
import ViewClient from './component/functionality/viewClient';
import CreateTask from './component/createTask';
import TaskList from './component/functionality/allTasksforManager';
import TaskProgress from './component/functionality/taskprogress';
import CreateProject from './component/CreateProject';
import CreateClient from './component/CreateClient';
import MyProject from './component/functionality/viewProjectManager';
import AssociateQueries from './component/Associatequery';
import CreateTeamMember from './component/createteammember';
import ChangePassword from './component/changePassword';
import ForgetPassword from './component/forgetpassword';



const App = () => {
  return (
    <div className="App">
     
      <Navb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalDetails" element={<PersonalDetails />} />
        <Route path="/ViewQuery" element={<ViewQuery />} />
        <Route path="/CreateQuery" element={<CreateQuery />} />
        <Route path="/ViewProject" element={<ViewProject />} />
        <Route path="/UpdateTaskProgress" element={<UpdateTaskProgress />} />
        <Route path="/ViewTeamMembers" element={<ViewTeamMembers />} />
        <Route path="/viewSolution/:queryId" element={<ViewSolution />} />
        <Route path="/TaskDetails" element={<TaskDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/createEmp" element={<CreateEmployee />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/MasterAdmin" element={<Admin />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/Associate" element={<Employee />} />
        <Route path="/viewEmp" element={<ViewEmp />} />
        <Route path="/viewClient" element={<ViewClient />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path='/alltasks' element={<TaskList />} />
        <Route path="/tasks" element={<TaskProgress />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route path="/viewProject" element={<ViewProject />} />
        <Route path='/createClient' element={<CreateClient/>}/>
        <Route path='/viewMyProject' element={<MyProject/>}/>
        <Route path='/associatesQuery' element={<AssociateQueries/>}/>
        <Route path='/createTeam' element={<CreateTeamMember/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>

      </Routes>
    </div>
  );
}

export default App;
