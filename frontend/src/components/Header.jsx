import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../features/userSlice/userSlice";
import { userBooksActions } from "../features/userBooksSlice/userBooksSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const navref = useRef();
  const redirect = (e) => {
    navigate(`/${e.target.name}`);
  };

  const { user } = useSelector((store) => store.user);
  const {setEmptyUserBooks} = userBooksActions
  const { logout } = userSliceActions;
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    navigate("/")
    dispatch(logout());
    dispatch(setEmptyUserBooks())
    localStorage.removeItem("user");
    toast.success("logged out!", { autoClose: 1500 });
  };


  return (
    <>
      <Navbar
        ref={navref}
        className="navbar"
        bg="info"
        variant="dark"
      >
        <Container className="w-100">
        <span className="navbar-brand ps-3 pe-0 me-0 ms-0 my-0 py-0" >THE BOOKEST</span>
            <Nav className="d-flex flex-row justify-content-end  w-100 ms-auto">
              <Nav.Link className="shadow-none ps-0" name="" onClick={redirect}>
                Home
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
                  <Nav.Link
                    className="shadow-none"
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
