import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingBar from "./UI/LoadingBar";

const FormConfirm = ({ mode, isLoading }) => {
  const isRegister = mode === "register";
  return (
    <Container className="p-0 d-flex align-items-center">
      <Button
        className={`px-0 d-flex justify-content-center auth-submit-button ${
          !isRegister ? "login-button" : "register-button"
        }`}
        variant="info"
        type="submit"
      >
        {!isLoading ? (
          isRegister ? (
            "Sign up"
          ) : (
            "Sign in"
          )
        ) : (
          <LoadingBar />
        )}
      </Button>
      <p className="mx-3 my-0 small">
        {isRegister ? "have an account? " : "don't have an account? "}
        <Link className="text-info text-nowrap" to={`/login/?mode=${isRegister ? "login" : "register"}`}>
          {isRegister ? "sign in" : "sign up"}
        </Link>
      </p>
    </Container>
  );
};
export default FormConfirm;
