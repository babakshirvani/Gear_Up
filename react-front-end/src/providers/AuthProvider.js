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
  const userID = localStorage.getItem('user_id');
  const [auth, setAuth] = useState(userID ? true : false);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  // Perform login process for the user & save authID, etc
  const login = function(username, password) {


    return new Promise((resolve, reject) => {
      axios.get(`/api/login/${username}`)
        .then((all) => {
          setAuth(true);
          console.log(all.data[0].user_name);

          localStorage.setItem('username', all.data[0].user_name);
          localStorage.setItem('user_id', all.data[0].id);
          localStorage.setItem('avatar', all.data[0].avatar);

          resolve(all)
          //     const id = "1234-1234-1234";  // Some random userId
          setUser({ username: all.data[0].user_name });
        })
        .catch((err) => {
          reject(err)
        })
    });



    // setAuth(true);
    // const id = "1234-1234-1234";  // Some random userId
    // setUser({ username, id, name: "Test User" });
  };

  const logout = function() {
    //setUser(null);

    setAuth(false);
    localStorage.clear();
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