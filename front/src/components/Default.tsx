import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useOutletContext } from "react-router-dom";
import Header from "./Header";

type ContextType = { text: string ; updateUser: (text: string) => void; };

export const Default = () => {


  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export function useHeaderText() {
  return useOutletContext<ContextType>();
}