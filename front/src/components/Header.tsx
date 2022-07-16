import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import Logo from './pump_metal.png';

const Header = () => {
  return (
    <HeaderAppBar >
        <img src={Logo} style={{height: "100%"}}/>
        <LogoutBt>ログアウト</LogoutBt>
    </HeaderAppBar>
  );
};

export default Header;

const HeaderAppBar = styled.div`
    box-shadow: 1px 1px 5px #444444;
    background-color: #ffffff;
    color: #555d61;
    padding: 0 15px;
    height: 32px;
    width: 100%;
    position: absolute;
    display: flex;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
`

const LogoutBt = styled.a`
    margin-left: auto;
    font-size: 10px;
    text-align: center;
`

const HeaderTitle = styled(Typography)`
    flex-grow: 1;
`