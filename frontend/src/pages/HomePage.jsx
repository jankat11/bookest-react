import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { getBooks } from "../features/bookGenreSlice/bookGenreSlice";


const HomePageLayout = () => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const { genre } = useSelector((store) => store.books);
  const { getGenre } = bookGenreActions;

  const getBooksGenre = (e) => {
    dispatch(getGenre(e.target.value));
  };

  useEffect(() => {
    if (genre) {
      dispatch(getBooks(genre));
    }
  }, [genre]);

  return (
    <>
      <Container className="w-100">
        <p className="display-6 my-3">BESTSELLER:</p>
        <Form.Select onChange={getBooksGenre} className="genreSelectForm">
          <option value="hardcover-fiction">hardcover fiction</option>
          <option value="trade-fiction-paperback">
            trade fiction paperback
          </option>
          <option value="hardcover-nonfiction">hardcover nonfiction</option>
          <option value="advice-how-to-and-miscellaneous">
            advice how to and miscellaneous
          </option>
          <option value="paperback-nonfiction">paperback nonfiction</option>
        </Form.Select>
      </Container>
      {show && <Outlet />}
    </>
  );
};
export default HomePageLayout;
