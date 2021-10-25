import React from "react";
import Navbar from "./Navbar";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Help from "../../pages/Help";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
// const Pages = styled.div`
//   width: 100vw;
//   height: 100vh;
// `;
function NavbarApp() {
  return (
    <>
      <Router>
        <Navbar />
        {/* <main>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/about" exact>
                <About />
              </Route>
              <Route path="/help" exact>
                <Help />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main> */}
      </Router>
    </>
  );
}
export default NavbarApp;
