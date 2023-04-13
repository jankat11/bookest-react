import { useEffect, useState } from "react";
import hero from "../../assets/heroPhoto.jpg";
import heroLg from "../../assets/heroPhotoLg.png";
import { Image, Container } from "react-bootstrap";

const Swiper = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    console.log("inside");
    setScreenSize(window.innerWidth);
    removeEventListener("resize", handleResize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <>
{/*       <Container style={{minHeight: "2.4rem"}} className="px-0 position-absolute">
        <p className="display-6 ps-1 py-1 hero-brand">BOOKEST</p>
      </Container> */}
      <Image fluid src={heroLg} className="hero-img" />
    </>
  );
};

export default Swiper;
