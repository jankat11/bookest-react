import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const redirect = (e) => {
    navigate(`/${e.target.name}`);
  };
  const [togglerOpen, setTogglerOpen] = useState(false)

  const handleToggler = () => {
    setTogglerOpen(prev => !prev)
  };


  return (
    <>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container>
          <Link to={"/"} className="text-decoration-none">
            <Navbar.Brand className="px-3 brand">THE BOOKEST</Navbar.Brand>
          </Link>
          <Navbar.Toggle
            onClick={handleToggler}
            className="shadow-none togglerMenu"
            aria-controls="basic-navbar-nav"
          >
            {!togglerOpen ? <SlMenu /> : <AiOutlineClose />}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navsHeader">
              <Nav.Link name="" onClick={redirect}>
                Home
              </Nav.Link>
              <Nav.Link name="about" onClick={redirect}>
                About
              </Nav.Link>
              <Nav.Link name="login" onClick={redirect}>
                Login
              </Nav.Link>
              <Nav.Link name="register" onClick={redirect}>
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
