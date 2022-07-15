import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { Home } from "./Home";
import { Work } from "./Work";

export const Default = () => {
  return (
    <Outlet/>
  )
}
