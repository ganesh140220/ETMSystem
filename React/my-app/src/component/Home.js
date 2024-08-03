import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImage from './template.jpg'; 
import rightSectionImage from './template2.png'; 

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container">
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="left-section">
          <h1>Employee Management System</h1>
          <p>This project aims to streamline the management of employees, including roles such as admin, manager, and employees. It allows for efficient project assignments, progress tracking, and communication within the organization.</p>
        </div>
        <div className="right-section">
          <img src={rightSectionImage} alt="Right Section" />
        </div>
      </div>
    </div>
  );
};

export default Home;
