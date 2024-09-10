import { RiArrowUpSLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const UpArrow = () => {
  const [appear, setAppear] = useState(false);

  const goToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setAppear(true);
      } else {
        setAppear(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {appear && (
        <div onClick={goToUp} className="up-scroll ">
          <RiArrowUpSLine size={25} />
        </div>
      )}
    </>
  );
};

export default UpArrow;
