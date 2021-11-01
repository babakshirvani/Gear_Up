import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//All the svg files
import HomeIcon from "../assets/home-solid.svg";
import DashboardIcon from "../assets/Forum.svg";
import CalendarIcon from "../assets/scheduled.svg";
import NewTripIcon from "../assets/draft.svg";
import { useContext, useState } from 'react';
import { authContext } from '../../providers/AuthProvider';
import Friendship from "../Friendship/Friendship";
import bgImage from "../assets/homePage.jpg";

const Container = styled.div`
  z-index: 1;
  position: fixed;
`;

const SidebarContainer = styled.div`
  background-color: #F3F5FA;
  width: 14rem;
  position: relative;  
  height: 100vh;
  box-shadow: 1px 2px 8px 2px rgb(166, 166, 166);
`;

const SlickBar = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
`;

const Item = styled(NavLink)`
  padding: 1rem 0;
  cursor: pointer;

  padding-left: 2.8rem;
  margin-right: 1rem;
  margin-top: 1.4rem;
  color: #48454B;
  &.active {
    border-top-right-radius: 19px;
    border-bottom-right-radius: 19px;
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
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1rem;
`;

const Profile = styled.div`

  padding: 1rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: left;
  
  color: rgba(53, 97, 255, 1);
  font-size: 2rem;
  img {
    width: 2.5rem;
    height:2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
  border-bottom: 1px solid lightgrey;
`;

const Name = styled.div`
text-decoration: none;
color: rgba(53, 97, 255, 1);
width: 100%;
padding: 1rem 0;
cursor: pointer;
display: flex;
padding-left: 1rem;
padding-top: 1.5rem;
`;
const Sidebar = () => {
  const [click, setClick] = useState(false);
  const { auth, user, logout } = useContext(authContext);
//  console.log("user ", user);

  return (
    <Container>
      <SidebarContainer>
      
        <SlickBar>
          <Profile >
            <img src={localStorage.getItem('avatar')} alt="Profile" />
            <Name>
            {localStorage.getItem('username')}
            </Name>
          </Profile>
          <Item activeClassName="active" exact to="/" >
            <img src={HomeIcon} alt="HomeIcon" />
            <Text >
              Home
            </Text>
          </Item>
          <Item activeClassName="active" to="/dashboard" >
            <img src={DashboardIcon} alt="DashboardIcon" />
            <Text >Dashboard</Text>
          </Item>
          <Item activeClassName="active" to="/calendar" >
            <img src={CalendarIcon} alt="CalendarIcon" />
            <Text >Calendar</Text>
          </Item>
          <Item activeClassName="active" to="/new" >
            <img src={NewTripIcon} alt="NewTripIcon" />
            <Text >NewTrip</Text>
          </Item>
          <Item onClick={logout} activeClassName="active" className="last-item" to="/logout" >
            <img src={NewTripIcon} alt="NewTripIcon" />
            <Text clicked={click}>Logout</Text>
          </Item>
          
          
        </SlickBar>
      </SidebarContainer>
     <Friendship/>
    </Container>
  );
};
export default Sidebar;
