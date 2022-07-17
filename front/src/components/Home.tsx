import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { createWork, deleteWork, getWorks } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeEditableText } from "./HomeEditableText";
import Plus from './add_circle_FILL1_wght400_GRAD0_opsz48.png';
import Close from './close_FILL1_wght500_GRAD0_opsz48.png';
import styled from "@emotion/styled";

export const Home = () => {
  const [works, setWorks] = useState(Array<any>)

  const navigate = useNavigate()

  const handleCreateWork = () => {
    const params = {
      id: 0
    }
    createWork(params).then((res) => {
      setWorks(res.data.works)
    })
  }

  const handleDeleteWork = (id: number) => {
    deleteWork(id).then((res) => {
      setWorks(res.data.works)
    })
  }

  useEffect(() => {
    getWorks()
      .then((res) => {
        const worksData = res.data.works
        setWorks(worksData)
      })
  }, [])

  return (
    <Wrapper>
      <div style={{marginTop: "54px"}}>

        {works == null ?
          <a>作成されたワークはありません</a> :
          <div style={{display: "flex", flexDirection: "column"}}>
            <WorkTitle>ワークリスト</WorkTitle>
            {works.map((work) => {
              return <WorkWrapper>
                       <HomeEditableText id={work.id} text={work.workName}/><img src={Close} onClick={() => handleDeleteWork(work.id)} height="16px" style={{ marginRight: "16px", marginLeft: "auto"}}/>
                    </WorkWrapper>
            })}
            <img src={Plus} onClick={() => handleCreateWork()} height="32px" style={{bottom: 10, position: "sticky", marginLeft: "auto", marginRight: "auto", marginTop: "24px"}}/>
          </div>
        }
      </div>
    </Wrapper>
  );
}

const WorkWrapper = styled.div`
  display: flex;
  margin-top: 8px;
`

const WorkTitle = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 2px dashed;
  border-color: #d4d4d4;
  margin-bottom: 16px;
  padding-bottom: 8px;
`

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
`