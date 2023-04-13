import { useEffect, useState } from "react";
import hero from "../../assets/heroPhoto.jpg";
import heroLg from "../../assets/heroPhotoLg.jpg";
import { Image } from "react-bootstrap";

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
      <p className={`display-4 hero-brand`}>
        <strong>Your Humble Library</strong>
      </p>
      <Image fluid src={heroLg} />
    </>
  );
};

export default Swiper;
