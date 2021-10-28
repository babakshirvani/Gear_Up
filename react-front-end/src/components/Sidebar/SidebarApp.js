import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import "./SidebarApp.css"


import {
  Route,
  Switch
} from 'react-router-dom';
//import Gear from "../Gear/Gear";
import Home from "../../pages/Home";
import Dashboard from "../../pages/Dashboard";
import NewTrip from "../../pages/NewTrip";
import Calendar from "../../pages/Calendar";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
`;
function SidebarApp() {
  return (
    <>
        <Sidebar />
        <Pages>
            <Switch >
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/new" component={NewTrip} />
            </Switch>
        </Pages>
    </>
  );
}

export default SidebarApp;