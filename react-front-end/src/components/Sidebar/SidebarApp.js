import React from "react";
import Sidebar from "./Sidebar";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Help from "../../pages/Help";
import styled from "styled-components";
import "./SidebarApp.css"


import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Gear from "../Gear/Gear";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
`;

function SidebarApp() {
  return (
    <>
      <Router>
        <Sidebar />
        {/* <Pages>
            <Switch >
              <Route exact path="/" component={Home} />
              <Route path="/help" component={Help} />
              <Route path="/about" component={About} />
            </Switch>
        </Pages> */}
        <main>
          <Switch>
          <Route path="/new" exact>
                <Gear />
              </Route>
          </Switch>
        </main>
        
      </Router>
    </>
  );
}

export default SidebarApp;