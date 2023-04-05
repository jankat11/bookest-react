import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice/userSlice";
import { userSliceActions } from "../features/userSlice/userSlice";
import AlertMessage from "../components/UI/Alert";
import FormConfirm from "../components/FormConfirm";

import React from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate("/");
  const [searchParams] = useSearchParams();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsDismatch, setPasswordsDismatch] = useState(false);
  const { emptyMessage, resetSuccessStatus } = userSliceActions;
  const emailRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, message, succesfullyLoggedIn } =
    useSelector((store) => store.user);

  const notify = () =>
    toast.success("logged in!", { autoClose: 1500 });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emptyMessage());
    setPasswordsDismatch(false);
    const isRegister = searchParams.get("mode") === "register";
    if (isRegister) {
      if (password !== confirmPassword) {
        setPasswordsDismatch(true);
        return;
      }
    }
    dispatch(getUser({ email, password, isRegister }));
  };

  useEffect(() => {
    dispatch(emptyMessage());
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  }, [searchParams.get("mode")]);

  useEffect(() => {
    if (message) {
      emailRef.current.focus();
    } else if (!message && succesfullyLoggedIn) {
      notify();
      dispatch(resetSuccessStatus());
      navigate("/");
    }
  }, [message, succesfullyLoggedIn]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <p className="display-6 mt-3">
            {searchParams.get("mode") === "register" ? "Register" : "Login"}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className=" w-100 position-relative label">
                {!message ? (
                  "Email address"
                ) : (
                  <AlertMessage
                    styles={{ height: "1.6rem" }}
                    classes="p-0 px-3 position-absolute password-dismatch"
                    variant="warning"
                    message={message}
                  />
                )}
              </Form.Label>

              <Form.Control
                ref={emailRef}
                value={email}
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-0"
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="w-100 position-relative label">
                {!passwordsDismatch ? (
                  "Password"
                ) : (
                  <AlertMessage
                    styles={{ height: "1.6rem" }}
                    classes="p-0 px-3 position-absolute password-dismatch"
                    variant="warning"
                    message={"Passwords do not match"}
                  />
                )}
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
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
