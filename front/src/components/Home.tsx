import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import { Grid, ListItem } from "@mui/material";
import List from '@mui/material/List';
import { getWorks } from "../api/auth";
import InfiniteScroll from "react-infinite-scroll-component";

export const Home = () => {
  const [works, setWorks] = useState(Array<any>)

  const navigate = useNavigate()


  useEffect(() => {
    getWorks()
      .then((res) => {
        const worksData = res.data.works
        setWorks(worksData)
      })
  }, [])

  return (
    <Grid container bgcolor="#f2f2f2" minHeight="100vh">
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={10}>
        {works == null ?
          <a>作成されたワークはありません</a> :
          <ul>
            {works.map((work) => {
              return <li><a onClick={() => navigate("/work", { state: { id: work.id}})}>{work.workName}</a></li>
            })}
          </ul>
        }
      </Grid>
    </Grid>
  );
}
