import { useContext } from 'react';
import { authContext } from '../../providers/AuthProvider';
import React from "react";
import HomeNavbar from "./HomeNavbar";
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
function HomeNavbarApp() {
  const { auth } = useContext(authContext);

  return (
    <>
      <HomeNavbar />
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
export default HomeNavbarApp;
