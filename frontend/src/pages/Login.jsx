import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice/userSlice";
import { userSliceActions } from "../features/userSlice/userSlice";
import FormConfirm from "../components/FormConfirm";
import React from "react";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { getGoogleAuth } from "../features/userSlice/userSlice";
import { GoogleButton } from "react-google-button";
import { blacklist } from "../utils";
import LoadingBar from "../components/UI/LoadingBar";

const Login = () => {
  const navigate = useNavigate("/");
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { emptyMessage, resetSuccessStatus } = userSliceActions;
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, message, succesfullyLoggedIn, isAuthLoading } =
    useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emptyMessage());
    const isRegister = searchParams.get("mode") === "register";
    if (isRegister) {
      if (password !== confirmPassword) {
        toast.warning("Passwords does not match", { autoClose: 2500 });
        return;
      }
      const isEvery = blacklist.every((letter) => !username.includes(letter));
      if (!isEvery) {
        toast.warning("Invalid username! Please use letters or numbers", {
          autoClose: 2500,
        });
        usernameRef.current.focus();
        return;
      }
    }
    dispatch(getUser({ username, password, isRegister }));
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(getGoogleAuth(codeResponse.access_token)).then((data) => {
        if (data.meta.requestStatus === "rejected") {
          toast.warning("something went wrong:( try later", {
            autoClose: 2500,
          });
        }
      });
    },
  });

  useEffect(() => {
    dispatch(emptyMessage());
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  }, [searchParams.get("mode")]);

  useEffect(() => {
    if (message) {
      usernameRef.current.focus();
      toast.warning(message, { autoClose: 2500 });
    } else if (!message && succesfullyLoggedIn) {
      toast.success("logged in!", { autoClose: 1500 });
      dispatch(resetSuccessStatus());
      navigate("/");
    }
  }, [message, succesfullyLoggedIn]);

  return (
    <Container className="smoothLittle">
      <Row className="justify-content-center">
        <Col md={6}  className="login-section">
          <p className="display-6 mt-3">
            {searchParams.get("mode") === "register" ? "Sign up" : "Sign in"}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className=" w-100 position-relative label">
                Username
              </Form.Label>

              <Form.Control
                ref={usernameRef}
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-0"
                type="text"
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="w-100 position-relative label">
                Password
              </Form.Label>

              <Form.Control
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-0"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            {searchParams.get("mode") === "register" && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-0"
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </Form.Group>
            )}

            <FormConfirm
              isLoading={isLoading}
              mode={searchParams.get("mode")}
            />
          </Form>
{/*           <p className="my-4">
            or
          </p> */}
          <div className=" w-100  google-button">
            <GoogleButton
              label={!isAuthLoading ? "Sign in with Google" : <LoadingBar />}
              style={{ width: "100%", boxShadow: "none"}}
              type="light"
              onClick={() => googleLogin()}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
