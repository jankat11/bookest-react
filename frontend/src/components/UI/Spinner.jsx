import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Container className="d-flex justify-content-center w-100 h-100 my-3">
      <Spinner
        className="loadingSpinner"
        animation="grow"
        variant="primary"
        size="xl"
      />
    </Container>
  );
};
export default LoadingSpinner;
