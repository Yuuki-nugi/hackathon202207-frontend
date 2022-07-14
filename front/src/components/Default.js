import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import { Home } from "./Home";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const Default = () => {
  return (
    <Grid container bgcolor="#f2f2f2" minHeight="100vh">
      <Grid item xs={2} elevation={3}>
      </Grid>
      <Grid item xs={7}>
        <Home />
      </Grid>
      <Grid item xs={3} elevation={3}>
      </Grid>
    </Grid>
  )
}
