import React, { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { Button, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';


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
    login(email, password).then(()=> { });
  };

  return (
    <>
    <div className="container">
    <div style={{ paddingLeft: '12rem', paddingTop: '6rem' }}>
    <h4 style={{ color: 'white' }}>Log In</h4>
    <div >
        <TextField
        type="text" name="username"
        value={email} placeholder="Enter Username or email"
        onChange={event => setEmail(event.target.value)} 
        margin="normal"
        variant="standard"
        color="secondary"
        fullWidth
        />
      </div>
      <div >
        <TextField
        type="password" name="password"
        value={password} placeholder="Password"
        onChange={event => setPassword(event.target.value)}
        margin="normal"
        variant="standard"
        color="secondary"
        fullWidth
        />
      </div>
      <div>
        <Button
        variant="contained"
        color="primary"
          type="submit" name="commit" onClick={onSubmit}
        >
          Log In
        </Button>
      </div>
    </div>
    </div>
  
    </>
  );
};