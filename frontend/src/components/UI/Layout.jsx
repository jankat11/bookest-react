import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import React from "react";
import Footer from "./Footer";
import { Image } from "react-bootstrap";
import heroLg from "../../assets/heroPhotoLg.png";

const Layout = () => {
  return (
    <section className="layout d-flex flex-column">
      <ToastContainer position="top-center" />
      <header className="site-masthead">
        <div className="d-flex justify-content-center hero-img-container">
          <Image fluid src={heroLg} className="hero-img" />
        </div>
        <Header />
      </header>
      <main className="app-main h-100">
        <Container className="app-shell">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </section>
  );
};
export default Layout;
