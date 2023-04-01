import React, { useState } from "react";
import { Outlet } from "react-router-dom";


const HomePageLayout = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      <p className="display-6 px-2">BESTSELLER:</p>
      {show && <Outlet />}
    </>
  );
};
export default HomePageLayout;


