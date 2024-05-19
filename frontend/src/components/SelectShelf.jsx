import { Container, Form } from "react-bootstrap";


const Checkboxes = ({state, handleCheckBoxes}) => {
  return (
    <Container className="p-0 d-flex">
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="to be read"
        name="will_be_read"
        value={state.willBeRead}
        checked={state.willBeRead}
        onChange={handleCheckBoxes}
        className="me-3"
      />
      <Form.Check
        type="checkbox"
        label="finished reading"
        id="disabled-default-checkbox"
        name="has_been_read"
        value={state.hasBeenRead}
        checked={state.hasBeenRead}
        onChange={handleCheckBoxes}
      />
    </Container>
  );
};
export default Checkboxes;
