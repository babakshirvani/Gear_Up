import React, { createContext, useState } from 'react';

import axios from 'axios';

//import SidebarApp from '../components/Sidebar/SidebarApp';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null)
  const [error, setError] = useState('');

  // Perform login process for the user & save authID, etc
   const login = async function (username, password) {

    

    //return new Promise((resolve, reject) => {
    // return axios.get(`/api/login/${username}`)
    
    // .then(all =>{
    
    //   setAuth(true);
    // setUser({"name": "alex"});
    // alert(user);

    // //resolve(all)  
    // })
    setAuth(true);
    const id = "1234-1234-1234";  // Some random userId
    setUser({ username, id, name: "Alec" });
    
  };

  const logout = function () {
    setUser(null);
    setAuth(false);
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout, error };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};