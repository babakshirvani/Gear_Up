import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ReactDOM from "react-dom";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
//import IconButton from "@material-ui/core/IconButton";
//import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { StylesProvider, useTheme } from "@material-ui/core/styles";
import axios from "axios";


const Content = styled.div`
  margin: auto;
  max-width: 500px;
  text-align:center
`;

// const GreenAvatar = styled(Avatar)`
//   background-color: green;
// `;

// const BlueAvatar = styled(Avatar)`
//   background-color: blue;
// `;

// const OrangeAvatar = styled(Avatar)`
//   background-color: orange;
// `;

// const BorderedAvatar = styled(Avatar)`
//   border: 3px solid lightseagreen;
// `;

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 14px;
  & > * {
    margin: 4px;
  }
`;

// const SizedAvatar = styled(Avatar)`
//   ${({ size, theme }) => `
//     width: ${theme.spacing(size)}px; 
//     height: ${theme.spacing(size)}px; 
//   `};
// `;

const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
`;



const AvatarWithText = () => {
  const [friendlist, setFriendlist] = useState([]);

  useEffect(()=>{
    const user_id=localStorage.getItem('user_id')
    axios.get(`api/friendlist/${user_id}`)
    .then((res)=>{
      setFriendlist([...res.data]);
    })
  },[])

  const theme = useTheme();

  return (
  
    <StylesProvider injectFirst>  
      <ThemeProvider theme={theme}>
        <Content>
          <h6>Friends</h6>
          <AvatarContainer>
            <ul>
              {
              friendlist.map((friend) =>             
              <li style={{ padding: "10px" }}>
              <AvatarLabel>
                  <Avatar
                    style={{ marginRight: "14px" }}
                    alt="Jack Sparrow"
                    src={friend.avatar}
                  />
                  <Typography variant="body2">{friend.user_name}</Typography>
              </AvatarLabel>
              </li>
            )
          }  
          </ul>    
          </AvatarContainer>
        </Content>
      </ThemeProvider>
    </StylesProvider>
  );
}
export default AvatarWithText;
