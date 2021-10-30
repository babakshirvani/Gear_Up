import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//All the svg files
import HomeIcon from "../assets/home-solid.svg";
import DashboardIcon from "../assets/Forum.svg";
import CalendarIcon from "../assets/scheduled.svg";
import NewTripIcon from "../assets/draft.svg";

const Container = styled.div`
  position: fixed;
  .active {
    border-right: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;
const SidebarContainer = styled.div`
  background-color: rgba(117, 190, 218, 0.3);;
  width: 100%;
  border-radius: 0 0 0 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  height: 100%;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
  `;
const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  position: relative;
  top: 0;
  left: 0;
  width: 10rem;
  border-radius: 0 0 0 0;
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
    border-right: 4px solid var(--white);
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
const Profile = styled.div`
  width: 10rem;
  height: 3rem;
  padding: 0.7rem;
  padding-bottom: 3.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  
  color: var(--white);
  
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Name = styled.div`
text-decoration: none;
color: var(--white);
width: 100%;
padding: 1rem 0;
cursor: pointer;
display: flex;
padding-left: 1rem;
padding-top: 1.5rem;
`;
const Sidebar = () => {
  const [click, setClick] = useState(false);
  return (
    <Container>
      <SidebarContainer>
        <SlickBar>
          <Profile >
            <img src="https://picsum.photos/200" alt="Profile" />
            <Name>
              <h6>Jhon&nbsp;Doe</h6>
            </Name>
          </Profile>
          <Item activeClassName="active" exact to="/" >
            <img src={HomeIcon} alt="HomeIcon" />
            <Text clicked={click}>
              Home
            </Text>
          </Item>
          <Item activeClassName="active" to="/dashboard" >
            <img src={DashboardIcon} alt="DashboardIcon" />
            <Text clicked={click}>Dashboard</Text>
          </Item>
          <Item activeClassName="active" to="/calendar" >
            <img src={CalendarIcon} alt="CalendarIcon" />
            <Text clicked={click}>Calendar</Text>
          </Item>
          <Item activeClassName="active" to="/new" >
            <img src={NewTripIcon} alt="NewTripIcon" />
            <Text clicked={click}>NewTrip</Text>
          </Item>
          
        </SlickBar>
      </SidebarContainer>
    </Container>
  );
};
export default Sidebar;
