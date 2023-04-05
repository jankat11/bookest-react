import { Container, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormConfirm = ({ mode, isLoading }) => {
  const isRegister = mode === "register";
  return (
    <Container className="p-0 d-flex align-items-center">
      <Button
        className={`rounded-0 ${
          !isRegister ? "login-button" : "register-button"
        }`}
        variant="primary"
        type="submit"
      >
        {!isLoading ? (
          isRegister ? (
            "Register"
          ) : (
            "Login"
          )
        ) : (
          <Spinner size="sm" animation="grow" />
        )}
      </Button>
      <p className="mx-3 my-0 small">
        {isRegister ? "have an account? " : "don't have an account? "}
        <Link to={`/login/?mode=${isRegister ? "login" : "register"}`}>
          {isRegister ? "login" : "register"}
        </Link>
      </p>
    </Container>
  );
};
export default FormConfirm;
