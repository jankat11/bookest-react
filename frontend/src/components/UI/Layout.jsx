import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";
import Hero from "./Hero";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <Hero />
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
export default Layout;
