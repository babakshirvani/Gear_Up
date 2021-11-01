import React,{useContext} from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import "./SidebarApp.css"
import { authContext } from '../../providers/AuthProvider';
import Login from '../../pages/Login'



import {
  Route,
  Switch,
  Redirect
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
    <authContext.Consumer>
      {({auth}) => (
      <>
        <Sidebar />
        <Pages>
            <Switch >
            <Route path="/dashboard" >{!auth && <Redirect to="/login"/>}{auth && <Dashboard/>}</Route>
              <Route path="/calendar" >{!auth && <Redirect to="/login"/>}{auth && <Calendar/>}</Route>
              <Route path="/new" >{!auth && <Redirect to="/login"/>}{auth && <NewTrip/>}</Route>
              <Route path="/logout" component={Home} ></Route>
            </Switch>
        </Pages>        
    </>
      )}
    </authContext.Consumer>
  );
}

export default SidebarApp;