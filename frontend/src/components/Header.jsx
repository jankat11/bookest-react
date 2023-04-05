import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../features/userSlice/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const navref = useRef();
  const redirect = (e) => {
    navigate(`/${e.target.name}`);
  };
  const [togglerOpen, setTogglerOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { logout } = userSliceActions;
  const dispatch = useDispatch();
  const handleToggler = () => {
    setTogglerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.success("logged out!", { autoClose: 1500 });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  /*   window.onclick = () => {
    console.log(navref.current.offsetHeight);
  } */

  return (
    <>
      <Navbar
        ref={navref}
        className="navbar"
        bg="primary"
        variant="dark"
        expand="sm"
      >
        <Container>
          {!user && (
            <Link to={"/"} className="text-decoration-none">
              <Navbar.Brand className="px-3 pe-0 mx-0">
                THE BOOKEST
              </Navbar.Brand>
            </Link>
          )}
          <Nav className="px-3">
            <Nav.Link onClick={redirect}>{user?.username}</Nav.Link>
          </Nav>
          <Navbar.Toggle
            onClick={handleToggler}
            className="shadow-none togglerMenu position-relative border-0"
            aria-controls="basic-navbar-nav"
          >
            {!togglerOpen ? <SlMenu /> : <AiOutlineClose />}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex flex-row justify-content-around ms-auto navsHeader">
              <Nav.Link className="shadow-none" name="" onClick={redirect}>
                Home
              </Nav.Link>
              <Nav.Link className="shadow-none" name="about" onClick={redirect}>
                About
              </Nav.Link>
              {!user ? (
                <>
                  <Nav.Link
                    className="shadow-none"
                    name="login/?mode=login"
                    onClick={redirect}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    className="shadow-none"
                    name="login/?mode=register"
                    onClick={redirect}
                  >
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="shadow-none" name="" onClick={redirect}>
                    My Books
                  </Nav.Link>
                  <Nav.Link
                    className="shadow-none"
                    name=""
                    onClick={handleLogout}
                  >
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
