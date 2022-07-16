import React, { useEffect, useState, VFC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWork, createProgress, createTheme, deleteTheme } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { Theme } from "./Theme";
import Plus from './add_circle_FILL1_wght400_GRAD0_opsz48.png';
import Good from './good.png';
import Bad from './bad.png';

export const Work = () => {
  const location = useLocation()

  const [workId, setWorkId] = useState<{ id: number}>(location.state as { id: number })
  const [work, setWork] = useState()
  const [themes, setThemes] = useState<Array<{id: number, title: string, result: string | null, }>>()
  const [nowThemeId, setNowThemeId] = useState()
  const [nowTheme, setNowTheme] = useState<{id: number, title: string, result: string | null, }>()
  const [degree, setDegree] = useState(0)
  const [subDegree, setSubDegree] = useState(0)

  const changeNowTheme = (nowThemeId : number | null) => {
    if(themes){
      const nowTheme = themes.filter( function( value: any ){
        if (value.id == nowThemeId) {
          return value
        }
      })[0]
      console.log("chamge")
      setNowTheme(nowTheme)
    }
  }

  const addTheme = () => {
    createTheme(workId.id).then((res) => {
      const theme = res.data.theme
      if(themes){
        setThemes([...themes, theme])
      }
    })
  }

  const handleDeleteTheme = (id: number) => {
    deleteTheme(id).then((res) => {
      if(themes){
        const new_themes: Array<{id: number, title: string, result: string | null, }> = themes.map((value) => {
          if(value.id != id){
            return value
          }
        }).filter((value): value is {id: number, title: string, result: string | null, } => value !== undefined)
        if(new_themes){
          setThemes(new_themes)
        }
      }
    })
  }

  setInterval(() => {

  }, 5000)

  useEffect(() => {
    getWork(workId.id)
      .then((res) => {
        const work = res.data.work
        const themes = res.data.themes
        const sumDegree = res.data.sumDegree
        const lastThemeId = res.data.lastThemeId
        setWork(work)
        setThemes(themes)
        setSubDegree(sumDegree)

        const nowTheme = themes.filter( function( value: any ){
          if (value.id == lastThemeId) {
            return value
          }
        })[0]
        setNowTheme(nowTheme)

      })
  }, [])

  useEffect(() => {
    console.log(nowTheme?.id)
 })

  return (
    <Grid container bgcolor="#f2f2f2" minHeight="100vh">
      <Grid item xs={7}>
        <ThemeWrapper>
          {nowTheme && themes &&
            themes.map(value => {
              if (value.id == nowTheme.id) {
                return <Theme workId={workId.id} id={value.id} title={value.title} result={value.result || ""} progress={true} changeNowThemeId={(id: number | null) => changeNowTheme(id)} deleteTheme={(id: number) => handleDeleteTheme(id)} />
              }
            })
          }
          
          <ScrollableDiv>
            {themes &&
              themes.map(value => {
                if (value.id != nowTheme?.id) {
                  return <Theme workId={workId.id} id={value.id} title={value.title} result={value.result || ""} progress={false} changeNowThemeId={(id: number | null) => changeNowTheme(id)} deleteTheme={(id: number) => handleDeleteTheme(id)} />
                }
              })
            }
            <img src={Plus} onClick={() => addTheme()} height="32px" style={{bottom: 10, position: "sticky", marginLeft: "auto", marginRight: "8px"}}/>
          </ScrollableDiv>
        </ThemeWrapper>
        <ReactionWrapper>
        <img src={Good} height="72px" />
        <img src={Bad} height="72px"/>
        </ReactionWrapper>
      </Grid>
      <Grid item xs={5}>
      </Grid>
    </Grid>
  );
}

const ThemeWrapper = styled.div`
  width: 80%;
  height: 70vh;
  margin-top: 24px;
  margin-left: 24px;
  margin-bottom: 0;
  border-radius: 8px;
  overflow: hidden;
`
const ScrollableDiv = styled.div`
  flex-direction: column;
  height: calc(100% - 80px);
  //ThemeWrapper　の高さ- progress=trueの高さ- themewrapperのmargintop　ハッカソン終わったら直す
  width: 100%;
  margin: auto;
  overflow: auto;
  display: flex;
  flex-flow: column;
  ::-webkit-scrollbar {
  width: 16px;
  background-color: none;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 10px;                      // スクロールバーの丸み
  box-shadow: inset 0 0 10px 10px #909090;  // スクロールバーの色
  border: solid 4px transparent;            // スクロールバーの左右の余白
  }
`

const ReactionWrapper = styled.div`
  margin-top: 16px;
  width: 80%;
  display: flex;
  justify-content: space-around;
`