
import React, { useState, useContext } from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';
import DashboardIcon from "../assets/dashboard-svgrepo-com.svg";

import styled from "styled-components";
import HomeIcon from "../assets/camping-svgrepo-com.svg";
import AboutUsIcon from "../assets/aboutUs.svg";
import HelpIcon from "../assets/help.svg";
import logInIcon from "../assets/logIn.svg";
import logOutIcon from "../assets/logOut.svg";
import logo1 from '../assets/hiking.png'
import logo2 from '../assets/img/logo2.png'


const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-right: 4rem;
  
`;
const Item = styled(NavLink)`
padding: 1rem 0;
cursor: pointer;
padding-left: 2.8rem;
margin-right: 1rem;
color: #48454B;
&.active {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: rgba(211, 224, 251, 1);
}
&:hover {
  text-decoration: none;
  color: #668fff;
}
img {
  width: 1.2rem;
  height: auto;
  filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
    brightness(78%) contrast(85%);
}
&.last-item {
  margin-top: auto;
  margin-bottom: 3rem;
  justify-self: flex-end;
  img {
    visibility: hidden;
  }
  &:hover {
    color: darkred;
  }
}
`;
const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  margin-left: 0.7rem;
  transition: all 0.3s ease;
`;

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { auth, logout } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        <img src={logo1} className="logo1" alt="logo" /><img src={logo2} className="logo2" alt="logo" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-black"></i>
      </button>
      <div
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" >
          <Container>
            <li className="nav-item ">
              <Item exact activeClassName="active" to="/" >
                <img src={HomeIcon} alt="HomeIcon" />
                <Text clicked={click}>Home</Text>
              </Item>
            </li>
            {!auth &&
              <li className="nav-item ">
                <Item exact activeClassName="active" to="/login" >
                  <img src={logInIcon} alt="login" />
                  <Text clicked={click}> Login</Text>
                </Item>
              </li>
            }

            {auth &&


              <li className="nav-item " onClick={logout}>
                <Item exact activeClassName="active" to="/logout" >
                  <img src={logOutIcon} alt="logout" />
                  <Text clicked={click}>Logout</Text>
                </Item>
              </li>

            }

            {auth &&
              <li className="nav-item ">
                <Item exact activeClassName="active" to="/dashboard" >
                  <img src={DashboardIcon} alt="DashboardIcon" />
                  <Text clicked={click}>Dashboard</Text>
                </Item>
              </li>
            }

            <li className="nav-item ">
              <Item exact activeClassName="active" to="/about" >
                <img src={AboutUsIcon} alt="about us" />
                <Text clicked={click}>About Us</Text>
              </Item>
            </li>
            <li className="nav-item ">
              <Item exact activeClassName="active" to="/help" >
                <img src={HelpIcon} alt="help" />
                <Text >Help</Text>
              </Item>
            </li>
          </Container>
        </ul>
      </div>
    </nav >
  );
};

export default Navbar;
