import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import MasterLayout from "../components/nav/MasterLayout";

const Layout = () => {
  return (
    <>
      <MasterLayout />
        <Outlet />
      <Footer />
    </>
  );
};

export default Layout;