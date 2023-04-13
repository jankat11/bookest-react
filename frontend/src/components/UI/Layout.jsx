import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";
import Footer from "./Footer";
import { Image } from "react-bootstrap";
import heroLg from "../../assets/heroPhotoLg.png";

const Layout = () => {
  return (
    <section className="layout d-flex flex-column">
      <ToastContainer />
      <Image fluid src={heroLg} className="hero-img" />
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
