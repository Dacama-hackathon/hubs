import React from "react";
// import { useContext } from "react";
// import { RouteComponentProps } from "react-router-dom";
// import { withRouter } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import { default as DefaultToolbar } from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import Typography from "@material-ui/core/Typography";
// import SettingsIcon from "@material-ui/icons/Settings";
// import InfoIcon from "@material-ui/icons/Info";
// import HomeIcon from "@material-ui/icons/Home";
// import Button from "@material-ui/core/Button";
import styled from "styled-components";
// import { Link } from "react-router-dom";

// interface Props extends RouteComponentProps {}

const Header = ({ history }) => {
  // const signOut = () => {
  //   app
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       history.push("/signin");
  //     });
  // };

  return (
    <AppBar position="fixed">
      <HeaderToolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {/* <HomeLink to="/"> */}
        <h3>Dacama</h3>
        {/* </HomeLink> */}
        {/* {currentUser ? (
          <SignOutButton onClick={signOut}>SignOut</SignOutButton>
        ) : (
          <SignInButton to="/signin">Signin</SignInButton>
        )} */}
      </HeaderToolbar>
    </AppBar>
  );
};

const HeaderToolbar = styled(DefaultToolbar)`
  background-color: crimson;
  position: relative;
`;

// const SignInButton = styled(Link)`
//   margin: 0 0 0 auto;
// `;

// const SignOutButton = styled(Button)`
//   margin: 0 0 0 auto;
// `;

// const HomeLink = styled(Link)`
//   color: white;

//   font-family: Roboto;
//   font-style: normal;
//   font-weight: normal;
//   font-size: 24px;
//   line-height: 28px;
//   display: flex;
//   align-items: center;
//   text-align: center;
// `;

// export default withRouter(Header);
export default Header;
