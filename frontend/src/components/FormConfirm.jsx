import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormConfirm = ({ mode }) => {
  return (
    <Container className="p-0 d-flex align-items-center">
      <Button className="rounded-0" variant="primary" type="submit">
        {mode === "register" ? "Register" : "Login"}
      </Button>
      <p className="mx-3 my-0 small">
        {mode === "register"
          ? "have an account? "
          : "don't have an account? "}
        <Link to={`/login/?mode=${mode === "register" ? "login" : "register"}`}>
          {mode === "register" ? "login" : "register"}
        </Link>
      </p>
    </Container>
  );
};
export default FormConfirm;
