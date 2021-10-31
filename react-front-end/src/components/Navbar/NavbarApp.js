import { useContext } from 'react';
import { authContext } from '../../providers/AuthProvider';
import React from "react";
import Navbar from "./Navbar";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Help from "../../pages/Help";
import Login from "../../pages/Login";
import SidebarApp from '../Sidebar/SidebarApp';
//import NavbarApp from '../Navbar/NavbarApp';



import Dashboard from "../../pages/Dashboard";

  import styled from "styled-components";
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
`;
function NavbarApp() {
  const { auth } = useContext(authContext);

  return (
    <>
      <Navbar />
      <Pages>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" >{!auth && <Login />}{auth && <Redirect to="/dashboard"/>}</Route>
          <Route path="/logout" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Redirect to="/" />
        </Switch>
      </Pages>

    </>
  );
}
export default NavbarApp;
