
import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../NavBar";


const Layout = (props) => {
  return (
    <div style={{ maxHeight: "100vh" }}>
      <nav><h1>Hello</h1></nav>
      <Outlet />
    </div>
  );
};

export default Layout;
