import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner = ({ size, classes }) => {
  return (
    <Container
      className={`d-flex justify-content-center w-100 h-100 my-3 ${classes}`}
    >
      <Spinner
        className="loadingSpinner"
        animation="grow"
        variant="info"
        size={size || "xl"}
      />
    </Container>
  );
};
export default LoadingSpinner;
