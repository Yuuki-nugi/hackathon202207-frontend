import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWorks } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import Close from './close_FILL1_wght500_GRAD0_opsz48.png';
import Play from './play_circle_FILL1_wght500_GRAD0_opsz48.png';
import Pause from './pause_FILL1_wght500_GRAD0_opsz48.png';
import Edit from './edit_FILL1_wght400_GRAD0_opsz48.png';


interface Props {
  id: number;
  title: string;
  result: string | null;
  progress: boolean;
}

export const Theme = (props: Props) => {
  const height = props.progress ? "32px" : "24px"
  const width = props.progress ? "90%" : "70%"
  const resultFont = props.progress ? "16px" : "12px"
  const resultWidth = props.progress ? "70%" : "50%"
  const playOrPause = props.progress ? Pause : Play
  return (
    <div style={{marginBottom: "8px"}}>
      <ThemeWrapper style={{width: width, fontSize: height}}>
        <img src={Close} height="16px" style={{ marginRight: "16px"}}/>
        <a style={{verticalAlign: "middle"}}>{props.title}</a>
        <img src={Edit} height="12px" style={{marginLeft: "8px"}}/>
        <img src={playOrPause} height="24px" style={{marginLeft: "auto", marginRight: "8px"}}/>
      </ThemeWrapper>
      {props.result != null &&
        <ResultWrapper style={{width: resultWidth, fontSize: resultFont}}>
            <a style={{verticalAlign: "middle"}}>{props.result}</a>
        </ResultWrapper>
      }
    </div>
  );
}

const ThemeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 0 9999px 9999px 0;
  background-color: skyblue;
`

const ResultWrapper = styled.div`
  background-color: #d2ebf5;
  border-radius: 0 9999px 9999px 0;
  padding-left: 16px;
`