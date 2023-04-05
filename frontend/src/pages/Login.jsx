import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice/userSlice";
import { userSliceActions } from "../features/userSlice/userSlice";
import AlertMessage from "../components/UI/Alert";
import FormConfirm from "../components/FormConfirm";

const Login = () => {
  const navigate = useNavigate("/");
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsDismatch, setPasswordsDismatch] = useState(false);
  const { emptyMessage } = userSliceActions;
  const emailRef = useRef();
  const dispatch = useDispatch();
  const { user, message } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emptyMessage());
    setPasswordsDismatch(false);
    if (searchParams.get("mode") === "register") {
      if (password !== confirmPassword) {
        setPasswordsDismatch(true);
        return;
      }
      dispatch(getUser({ email, password })).then((data) => {
        console.log(data.meta.requestStatus);
        console.log(message);
      });
    }
  };

  useEffect(() => {
    console.log(searchParams.get("mode"));
  }, [searchParams]);

  useEffect(() => {
    if (message) {
      emailRef.current.focus();
    }
  }, [message]);

  return (
    <div>
      <p className="display-6 mt-3">
        {searchParams.get("mode") === "register" ? "Register" : "Login"}
      </p>
      <Form onSubmit={handleSubmit} className="justify-content-md-center">
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
              type="password"
              placeholder="Confirm password"
              required
            />
          </Form.Group>
        )}

        <FormConfirm mode={searchParams.get("mode")} />
      </Form>
    </div>
  );
};

export default Login;
