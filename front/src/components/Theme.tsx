import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWorks } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import { getWork, createProgress, deleteTheme, updateTheme } from "../api/auth";
import styled from "@emotion/styled";
import Close from './close_FILL1_wght500_GRAD0_opsz48.png';
import Play from './play_circle_FILL1_wght500_GRAD0_opsz48.png';
import Pause from './pause_FILL1_wght500_GRAD0_opsz48.png';
import Edit from './edit_FILL1_wght400_GRAD0_opsz48.png';
import { ThemeEditableText } from "./ThemeEditableText";


interface Props {
  workId: number;
  id: number;
  title: string;
  result: string | '';
  progress: boolean;
}

export const Theme = (props: Props) => {
  console.log(props.title)
  const generateProgressParams = (workId: number, themeId: number | null) => {
    const params = {workId: workId, themeId: themeId}
    return params
  }

  const handleCreateProgress = () => {
    createProgress(generateProgressParams(props.workId, props.progress ? null : props.id))}

  const height = props.progress ? "32px" : "24px"
  const width = props.progress ? "90%" : "70%"
  const resultFont = props.progress ? "16px" : "12px"
  const resultWidth = props.progress ? "70%" : "50%"
  const playOrPause = props.progress ? Pause : Play

  return (
    <div style={{marginBottom: "8px"}}>
      <ThemeWrapper style={{width: width, fontSize: height}}>
        <img src={Close} onClick={() => deleteTheme(props.id)} height="16px" style={{ marginRight: "16px"}}/>
        <ThemeEditableText id={props.id} text={props.title} type="title"/>
        <img src={playOrPause} onClick={() => handleCreateProgress()} height="24px" style={{marginLeft: "auto", marginRight: "8px"}}/>
      </ThemeWrapper>
      {props.result != null &&
        <ResultWrapper style={{width: resultWidth, fontSize: resultFont}}>
            <ThemeEditableText id={props.id} text={props.result} type="result"/>
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
  background-color: #87ceeb;
`

const ResultWrapper = styled.div`
  background-color: #d2ebf5;
  border-radius: 0 9999px 9999px 0;
  padding-left: 16px;
`