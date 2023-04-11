import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice/userSlice";
import { userSliceActions } from "../features/userSlice/userSlice";
import FormConfirm from "../components/FormConfirm";
import React from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate("/");
  const [searchParams] = useSearchParams();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { emptyMessage, resetSuccessStatus } = userSliceActions;
  const emailRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, message, succesfullyLoggedIn } = useSelector(
    (store) => store.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emptyMessage());
    const isRegister = searchParams.get("mode") === "register";
    if (isRegister) {
      if (password !== confirmPassword) {
        toast.warning("Passwords does not match", { autoClose: 2500 });
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
        <Col md={6}>
          <p className="display-6 mt-3">
            {searchParams.get("mode") === "register" ? "Register" : "Login"}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className=" w-100 position-relative label">
                Email address
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
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
