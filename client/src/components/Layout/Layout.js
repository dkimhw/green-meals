
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
