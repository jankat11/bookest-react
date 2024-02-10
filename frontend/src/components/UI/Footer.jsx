import { AiFillLinkedin } from "react-icons/ai";
import { GoInfo } from "react-icons/go";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-center p-3 pb-0 mt-auto"
      style={{ backgroundColor: "#369" }}
    >
      <p className="text-light p-0 d-flex small justify-content-center w-100">
        <span>
          © 2024 Copyright:
          <a
            className="text-decoration-none text-light ms-1"
            target="_blank"
            href="https://www.linkedin.com/in/cankat-g%C3%BCven-248a84157/"
          >
            Cankat Güven <AiFillLinkedin className="linkedin" />
          </a>
        </span>
        <Link
          to="/about"
          className="text-decoration-none ms-3 text-light shadow-none text-nowrap"
        >
          About <GoInfo className="about-icon mb-1" />
        </Link>
      </p>
    </footer>
  );
};
export default Footer;
