import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, variant, title }) => {
  return (
    <Alert variant={variant}>
      <p className="display-6">{title} </p>
      <p className="lead">{message} </p>
    </Alert>
  );
};
export default AlertMessage;
