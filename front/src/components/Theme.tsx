import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWorks } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";

interface Props {
  id: number;
  title: string;
  result: string | null;
  progress: boolean;
}

export const Theme = (props: Props) => {
  return (
    <ThemeWrapper style={{width: props.progress ? "90%" : "70%", fontSize: props.progress ? "32px" : "24px"}}>
      <a>{props.title}</a>
    </ThemeWrapper>
  );
}

const ThemeWrapper = styled.div`
  padding: 4px;
  margin-bottom: 8px;
  border-radius: 0 9999px 9999px 0;
  background-color: skyblue;
`