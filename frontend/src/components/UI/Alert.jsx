import { Alert } from "react-bootstrap";

const AlertMessage = ({ styles, classes, message, variant, title }) => {
  return (
    <Alert style={styles || {}} className={classes || ""} variant={variant}>
      {title && <p className="display-6">{title} </p>}
      <p >{message}</p>
    </Alert>
  );
};
export default AlertMessage;
