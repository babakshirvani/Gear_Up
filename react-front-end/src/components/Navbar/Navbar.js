
import React, { useState, useContext } from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';
import DashboardIcon from "../assets/Forum.svg";

import styled from "styled-components";
import HomeIcon from "../assets/home-solid.svg";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-right: 4rem;
  .active {
    border-bottom: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;
const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-bottom: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;
const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  
  margin-left: 1.5rem;
  transition: all 0.3s ease;
`;

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { auth, logout } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        Gear Up
      </NavLink>
      <button
        className="navbar-toggler"
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
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
                  <i class="fas fa-sign-in-alt"></i>
                  <Text clicked={click}> Login</Text>
                </Item>
              </li>
              }
            
              {auth && 
              

                <li className="nav-item " onClick={logout}>
                <Item exact activeClassName="active" to="/logout" >
                  <i class="fas fa-sign-in-alt"></i>
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
                  <i className="far fa-address-book"></i>
                  <Text clicked={click}>About Us</Text>
                </Item>
              </li>
            <li className="nav-item ">
              <Item exact activeClassName="active" to="/help" >
                <i className="far fa-clone"></i>
                <Text clicked={click}>help</Text>
              </Item>
            </li>
          </Container>
        </ul>
      </div>
    </nav >
  );
};

export default Navbar;
