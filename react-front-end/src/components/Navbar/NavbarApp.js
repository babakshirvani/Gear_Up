
import React from "react";
import Navbar from "./Navbar";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Help from "../../pages/Help";
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
  return (
    <>
      <Navbar />
      <Pages>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Dashboard} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Redirect to="/" />
        </Switch>
      </Pages>

    </>
  );
}
export default NavbarApp;
