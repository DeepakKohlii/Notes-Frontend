import React from "react";

import { styled } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useAuth } from "../../../Hooks/useAuth";

// import logo from "../../../assets/Images/google-keep-logo.png";

import { useLocation } from "react-router-dom";

const Navbar = styled(AppBar)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
  background-color: #fff;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 22px;
  padding: 0 0 0 15px;
`;

const capitalize = (str: any) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Header = ({ handleDrawer, open }: { handleDrawer: any; open: any }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const pathName = capitalize(location.pathname.substring(1));

  const { logout } = useAuth();

  return (
    <Navbar>
      <Toolbar>
        <IconButton onClick={handleDrawer} edge="start" sx={{ marginRight: 5 }}>
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Heading>{pathName || "Notes Application"}</Heading>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </Navbar>
  );
};

export default Header;
