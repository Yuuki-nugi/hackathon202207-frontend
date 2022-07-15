import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWorks } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { Theme } from "./Theme";

export const Work = () => {
  const [works, setWorks] = useState(Array<any>)

  useEffect(() => {

  }, [])

  return (
    <Grid container bgcolor="#f2f2f2" minHeight="100vh">
      <Grid item xs={7}>
      <ScrollableDiv>
          <Theme id={1} title="title" result="result" progress={true} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
          <Theme id={1} title="title" result="result" progress={false} />
        </ScrollableDiv>
      </Grid>
      <Grid item xs={5}>
      </Grid>
    </Grid>
  );
}

const ScrollableDiv = styled.div`
  width: 80%;
  height: 60vh;
  margin-top: 24px;
  margin-left: 24px;
  overflow: auto;
  display: flex;
  flex-flow: column;
  ::-webkit-scrollbar {
  width: 16px;
  background-color: #f9f9f9;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 10px;                      // スクロールバーの丸み
  box-shadow: inset 0 0 10px 10px #909090;  // スクロールバーの色
  border: solid 4px transparent;            // スクロールバーの左右の余白
  }
`