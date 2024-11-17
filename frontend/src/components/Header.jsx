import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../features/userSlice/userSlice";
import { userBooksActions } from "../features/userBooksSlice/userBooksSlice";
import { toast } from "react-toastify";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navref = useRef();
  const redirect = (e) => {
    navigate(`/${e.target.name}`);
  };

  const isOnHomePage = location.pathname.split("/")[1] === "";
  const isOnAboutPage = location.pathname.split("/")[1] === "about";
  const isOnSingIn = location.pathname.split("/")[1] === "login";
  const isOnMyBooks = location.pathname.split("/")[1] === "mybooks";

  const { user } = useSelector((store) => store.user);
  const { errorMessage } = useSelector((store) => store.userBooks);
  const { setEmptyUserBooks } = userBooksActions;
  const { logout } = userSliceActions;
  const dispatch = useDispatch();

  /*   console.log("user is: ", user); */
  const handleLogout = ({ error = false }) => {
    navigate("/");
    dispatch(logout());
    dispatch(setEmptyUserBooks());
    localStorage.removeItem("user");
    if (!error) {
      toast.success("logged out!", { autoClose: 1500 });
    }
  };

  useEffect(() => {
    if (errorMessage) {
      handleLogout({ error: true });
    }
  }, [errorMessage]);

  return (
    <>
      <Navbar ref={navref} className="navbar" bg="info" variant="dark">
        <Container className="header-content ">
          <a href="/" className="text-decoration-none">
            <span className="navbar-brand ps-3 pe-0 me-0 ms-0 my-0 py-0">
            BOOK<span style={{ color: "#f57a00" }}>E</span>ST
    
            </span>
          </a>
          <Nav className="d-flex flex-row main-nav-wrapper justify-content-end  w-100 ms-auto">
            <Nav.Link
              className={`shadow-none ps-0 ${
                isOnHomePage && "active-header-link"
              }`}
              name=""
              onClick={redirect}
            >
              Home
            </Nav.Link>
            {!user || errorMessage ? (
              <>
                <Nav.Link
                  className={`shadow-none ${
                    isOnAboutPage && "active-header-link"
                  }`}
                  name="about"
                  onClick={redirect}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  className={`shadow-none ${
                    isOnSingIn && "active-header-link"
                  }`}
                  name="login/?mode=login"
                  onClick={redirect}
                >
                  Sign in
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  className={`shadow-none ${
                    isOnMyBooks && "active-header-link"
                  }`}
                  name="mybooks"
                  onClick={redirect}
                >
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
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
