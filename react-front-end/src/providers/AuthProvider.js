import React, { createContext, useState } from 'react';


//import SidebarApp from '../components/Sidebar/SidebarApp';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Perform login process for the user & save authID, etc
  const login = function (email, password) {
    setAuth(true);
    const id = "1234-1234-1234";  // Some random userId
    setUser({ email, id, name: "Test User" });
    
    // return (
    //   <Router><Route path="/dashboard" component={SidebarApp} /></Router>
    // );
  //  props.history.push('/dashboard');
  };

  const logout = function () {
    setUser(null);
    setAuth(false);
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};