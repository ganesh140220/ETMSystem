import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';

=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> 838fc7959169ca6ea378e4876b0dcd8f61b27947

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
