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
    <div style={{position: "absolute"}}>
      <div style={{marginTop: "54px"}}>
        {works == null ?
          <a>作成されたワークはありません</a> :
          <ul style={{marginLeft: "64px", marginTop: "64px"}}>
            {works.map((work) => {
              return <li><div style={{display: "flex", alignItems: "center"}}>
                  <HomeEditableText id={work.id} text={work.workName}/><img src={Close} onClick={() => handleDeleteWork(work.id)} height="16px" style={{ marginRight: "16px"}}/>
                </div></li>
            })}
            <img src={Plus} onClick={() => handleCreateWork()} height="32px" style={{bottom: 10, position: "sticky", marginLeft: "auto", marginRight: "8px"}}/>
          </ul>
        }
      </div>
    </div>
  );
}
