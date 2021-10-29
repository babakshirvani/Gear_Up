import React, { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { Button, TextField } from '@material-ui/core';


//import { Redirect, Route } from "react-router-dom";

// import SidebarApp from '../components/Sidebar/SidebarApp';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useContext(authContext);

  const onSubmit = function(event) {
    event.preventDefault();
    email && login(email, password);
  };

  return (
    <>
    <h4 style={{ color: 'white' }}>Log In</h4>
    {/* <div className="container">
    <div className="login">
      <form onSubmit={onSubmit}>
        <p>
          <input type="text" name="username"
            value={email} placeholder="Enter Username or email"
            onChange={event => setEmail(event.target.value)} />
        </p>
        <p>
          <input type="password" name="password"
            value={password} placeholder="Password"
            onChange={event => setPassword(event.target.value)} />
        </p>
        <p className="submit">
          <button type="submit" name="commit">Log In</button>
        </p>
      </form>
    {error}
      
    </div>
    </div> */}
    </>
  );
};