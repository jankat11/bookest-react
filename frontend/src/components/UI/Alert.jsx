import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, variant }) => {
  return <Alert variant={variant}>{message}</Alert>;
};
export default AlertMessage;
