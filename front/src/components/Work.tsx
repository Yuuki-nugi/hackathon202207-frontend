import React, { useEffect, useRef, useState, VFC } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWork, createProgress, createTheme, deleteTheme, updateFeeling, getComments, createComment } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { Theme } from "./Theme";
import Plus from './add_circle_FILL1_wght400_GRAD0_opsz48.png';
import Good from './good.png';
import Bad from './bad.png';
import { GroupAddText } from "./GroupAddText";
import moment from "moment";
import ActionCable from 'actioncable'

export const Work = (callback: () => void) => {
  const location = useLocation()
  const [workId, setWorkId] = useState<{ id: number}>(location.state as { id: number })
  const [work, setWork] = useState()
  const [themes, setThemes] = useState<Array<{id: number, title: string, result: string | null, }>>()
  const [nowThemeId, setNowThemeId] = useState()
  const [nowTheme, setNowTheme] = useState<{id: number, title: string, result: string | null, }>()
  const [feeling, setFeeling] = useState(0)
  const [sumFeeling, setSumFeeling] = useState(0)
  const [putFeelingBt, setPutFeelingBt] = useState(false)
  const [holdFeeling, setHoldFeeling] = useState(0)
  const [numberOfParticipants, setNumberOfParticipants] = useState(0)
  const [backgroundColor, setBackgrountColor] = useState<string>()
  const [comments, setComments] = useState<Array<any>>([<a>コメントはありません</a>])
  const [hasMoreScroll, setHasMoreScroll] = useState(true)
  const [inputComment, setInputComment] = useState("")
  const callbackRef = useRef<() => void>(callback);

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

  const handleGood = () => {
    setHoldFeeling(1)
    if(feeling < 3){
      const params = {
        workId: workId.id,
        isPlus: true
      }
      updateFeeling(params).then((res) => {
        setFeeling(res.data.feeling)
        setSumFeeling(res.data.sumFeeling)
      })
    }
  }

  const handleBad = () => {
    setHoldFeeling(1)
    if(feeling > -3){
      const params = {
        workId: workId.id,
        isPlus: false
      }
      updateFeeling(params).then((res) => {
        setFeeling(res.data.feeling)
        setSumFeeling(res.data.sumFeeling)
      })
    }
  }

  const calmDown = (callback: () => void) => {
    const callbackRef = useRef<() => void>(callback);
    useEffect(() => {
      callbackRef.current = callback; // 新しいcallbackをrefに格納！
    }, [callback]);
    
    useEffect(() => {
      const tick = () => { 
        callbackRef.current()
      } 
      const id = setInterval(tick, 2000);
      return () => {
        clearInterval(id);
      };
    }, []);
  };

  calmDown(() => {
    if(holdFeeling == 1){
      setHoldFeeling(0)
    }else{
      if(feeling == 0){
        return
      }else {
        setFeeling(0)
        const params = {
          workId: workId.id,
          isPlus: feeling > 0 ? false : true
        }
        updateFeeling(params).then((res) => {
          setFeeling(res.data.feeling)
          setSumFeeling(res.data.sumFeeling)
        })

      }
    }
  })

  const handleCommentCreate = () => {
    if(inputComment.length > 0){
      const params = {
        workId: workId.id,
        text: inputComment
      }
      createComment(params)
    }
  }

  const fetchMoreComments = async () => {
    if(comments){
      const params = {
        number : 12,
        start : comments[comments.length-1].id,
        workId : workId.id,
      }
      const res = await getComments(params)
      if(res.data.comments.length > 1){
        setComments(comments => [...comments, ...res.data.comments])
      }else if(res.data.comments.length == 1){
        setComments(comments => [...comments, ...res.data.comments])
        setHasMoreScroll(false)
      }else{
        setHasMoreScroll(false)
      }
    }
  }

  const loader = (
    <div>
      <h1>loading ...</h1>
    </div>
  );

  useEffect(() => {
    const max = [255, 255, 100]
    const min = [150, 150, 150]
    const color = (target: number) => {
      return 255 - Math.round((255-target)/3/numberOfParticipants*Math.abs(sumFeeling))
    }
    if(sumFeeling >= 0){
      setBackgrountColor(`rgb(${color(max[0])}, ${color(max[1])}, ${color(max[2])})`)
    }else{
      setBackgrountColor(`rgb(${color(min[0])}, ${color(min[1])}, ${color(min[2])})`)
    }
  }, [sumFeeling, numberOfParticipants])

  useEffect(() => {

    getWork(workId.id)
      .then((res) => {
        const work = res.data.work
        const themes = res.data.themes
        const sumFeeling = res.data.sumFeeling
        const feeling = res.data.feeling
        const lastThemeId = res.data.lastThemeId
        const numberOfParticipants = res.data.numberOfParticipants
        setWork(work)
        setThemes(themes)
        setSumFeeling(sumFeeling)
        setFeeling(feeling)
        setNumberOfParticipants(numberOfParticipants)

        const nowTheme = themes.filter( function( value: any ){
          if (value.id == lastThemeId) {
            return value
          }
        })[0]
        setNowTheme(nowTheme)

        const params = {
          number : 20,
          start : null,
          workId : workId.id,
        }
        getComments(params).then((res) => {
          setComments(res.data.comments)
        })
      })

      var cable = ActionCable.createConsumer( "ws://localhost:3300/cable"); 

      cable.subscriptions.create(
        {
          channel: "WorksChannel",
          workId: workId.id
        },
        {
          received: (data) => {
            setComments(comments => [data.comments, ...comments])
            console.log(data)
          },
          connected: () => console.log("connected"),
          disconnected: () => console.log("disconnected")
        }
      );

      return () => cable.disconnect()
  }, [])

  return (
    <div style={{background: `linear-gradient(${backgroundColor}, rgb(255, 255, 255))`, boxSizing: "border-box", height: "90%"}}>
      <Grid container minHeight="100vh">
        <Grid item xs={6}>
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
          <img src={Good} onClick={() => handleGood()} height="72px" />
          <img src={Bad} onClick={() => handleBad()} height="72px"/>
          </ReactionWrapper>
        </Grid>
        <Grid item xs={6}>
          <ChatWrapper>
            <ChatScrollagleDiv id="chatScroll">
              <InfiniteScroll
                dataLength={comments.length}
                next={fetchMoreComments}
                hasMore={hasMoreScroll} 
                loader={loader}
                scrollableTarget="chatScroll"
                style={{maxWidth: "100%"}}
              >
                <div style={{width: "100%",maxWidth: "100%", wordBreak: "normal"}}>
                  {comments.map(value => {
                    return <CommentWrapper>
                        <a style={{fontSize: "60%"}}>{moment(value.createdAt).format('HH:mm')} </a> 
                        <a>{value.text}</a> 
                      </CommentWrapper>
                  })}
                </div>
              </InfiniteScroll>
            </ChatScrollagleDiv>
            <ChatFormWrapper>
              <ChatFormInput onChange={(e) => {
                  setInputComment(e.target.value)
              }} type="text" value={inputComment}>
              </ChatFormInput>
              <ChatFormBt onClick={() => handleCommentCreate()}>送信</ChatFormBt>
            </ChatFormWrapper>
          </ChatWrapper>
            <GroupAddWrapper>
              <GroupAddText id={workId.id} setParticipants={(number: number) => setNumberOfParticipants(number)}/>
            </GroupAddWrapper>
        </Grid>
      </Grid>
    </div>
  );
}

const ThemeWrapper = styled.div`
  width: 80%;
  height: 70vh;
  margin-top: 54px;
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

const GroupAddWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`

const ChatWrapper = styled.div`
  flex-direction: column;
  display: flex;
  flex-flow: column;
  width: 80%;
  height: 70vh;
  margin-top: 54px;
  padding-left: 54px;
`

const ChatScrollagleDiv = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  max-width: 100%;
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

const ChatFormWrapper = styled.div`
  position: sticky;
  bottom: 0;
  margin-top: auto;
  box-sizing: border-box;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
`

const ChatFormInput = styled.input`
  background: #d2ebf5;
  border: none;
  height: 2.0em;
  width: 80%;
  border-radius: 10px; 
  :focus{
    outline: 0;
  }
`

const ChatFormBt = styled.button`
  cursor: pointer;
  border: none;
  background: #87ceeb;
  color: #fff;
  outline : none;
  height: 2.2em;
  width: 15%;
  border-radius: 10px; 
  ::-webkit-input-placeholder {
    color: #3879D9;
  }
`

const CommentWrapper = styled.div`
  border-bottom: 1px solid;
  border-color: #e9e9e9;
`