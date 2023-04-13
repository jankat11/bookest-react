import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";

const Layout = () => {
  return (
    <section className="layout d-flex flex-column">
      <ToastContainer />
      <Hero />
      <Header />
      <main className="py-3 h-100">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </section>
  );
};
export default Layout;
