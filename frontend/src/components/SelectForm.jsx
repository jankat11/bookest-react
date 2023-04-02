import { Form, Container, Row, Col } from "react-bootstrap";

const SelectForm = ({ getBooksGenre, genre }) => {
  return (
    <div class=" d-flex my-3">
      <span
        class="bestseller input-group-text rounded-0 border-none border-end-0 pe-1"
        id="inputGroup-sizing-default"
      >
        Bestseller:
      </span>
      <Form.Select
        value={genre || "hardcover-fiction"}
        onChange={getBooksGenre}
        className="genreSelectForm w-100 rounded-0 border-start-0  ps-1 shadow-none"
        aria-describedby="inputGroup-sizing-default"
      >
        <option value="hardcover-fiction">hardcover fiction</option>
        <option value="trade-fiction-paperback">trade fiction paperback</option>
        <option value="hardcover-nonfiction">hardcover nonfiction</option>
        <option value="advice-how-to-and-miscellaneous">
          advice how to and miscellaneous
        </option>
        <option value="paperback-nonfiction">paperback nonfiction</option>
      </Form.Select>
    </div>
  );
};
export default SelectForm;
