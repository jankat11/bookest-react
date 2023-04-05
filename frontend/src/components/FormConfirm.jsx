import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormConfirm = ({ mode }) => {
  return (
    <Container className="p-0 d-flex align-items-center">
      <Button variant="primary" type="submit">
        {mode === "register" ? "Register" : "Login"}
      </Button>
      <p className="mx-3 my-0">
        {mode === "register"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Link to={`/login/?mode=${mode === "register" ? "login" : "register"}`}>
          {mode === "register" ? "login" : "register"}
        </Link>
      </p>
    </Container>
  );
};
export default FormConfirm;
