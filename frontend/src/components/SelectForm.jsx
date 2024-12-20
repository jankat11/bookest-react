import { Form } from "react-bootstrap";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";

const SelectForm = ({ getBooksGenre, genre }) => {
  const { changeSearchActiveStatus, setSearchWords, resetPage } = bookGenreActions;
  const { isSearchActive } = useSelector((store) => store.books);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(resetPage());
    if (isSearchActive) {
      dispatch(changeSearchActiveStatus());
    }
    dispatch(setSearchWords(""));
    getBooksGenre(e);
  };

  return (
    <div className=" d-flex  my-2">
      <span
        className="bestseller input-group-text rounded-0 bg-white border-none border-end-0 pe-1"
        id="inputGroup-sizing-default"
      >
        Bestseller:
      </span>
      <Form.Select
        value={!isSearchActive ? genre || "hardcover-fiction" : ""}
        onChange={handleChange}
        className="genreSelectForm w-100 rounded-0 border-start-0 ps-2 shadow-none"
        aria-describedby="inputGroup-sizing-default"
      >
        {isSearchActive && (
          <option defaultValue={""} >
            select a genre
          </option>
        )}
        <option value="hardcover-nonfiction">hardcover nonfiction</option>
        <option value="hardcover-fiction">hardcover fiction</option>
        <option value="trade-fiction-paperback">trade fiction paperback</option>
        <option value="advice-how-to-and-miscellaneous">
          advice how to and miscellaneous
        </option>
        <option value="paperback-nonfiction">paperback nonfiction</option>
        <option value="young-adult-hardcover">young adult hardcover</option>
        <option value="childrens-middle-grade-hardcover">children's</option>
      </Form.Select>
    </div>
  );
};
export default SelectForm;
