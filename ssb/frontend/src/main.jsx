import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './index.css'
import Start from './start.jsx'
import CustomerPage from './user.jsx'
import BarberPage from './Barberpage.jsx'
import SignIn from './signin.jsx'
import CreateAccount from "./createaccount.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap everything inside Router */}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/barber" element={<BarberPage />} />
        <Route path="/barberSignIn" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  </StrictMode>,
)

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from './App.jsx'
// import "./index.css";  // Ensure styles are imported

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
