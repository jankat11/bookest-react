import React from "react";
import { Outlet } from "react-router-dom";


const HomePageLayout = () => {
  return (
    <>
      <p className="display-6 px-2">BESTSELLER:</p>
      <Outlet />
    </>
  );
};
export default HomePageLayout;


