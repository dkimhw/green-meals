
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar";

const Layout = (props) => {
  return (
    <div style={{ maxHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
