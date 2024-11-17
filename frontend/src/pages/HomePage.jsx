import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { getBooks } from "../features/bookGenreSlice/bookGenreSlice";
import SearchForm from "../components/SearchForm";
import SelectForm from "../components/SelectForm";
import { getBooks as myBooks } from "../features/userBooksSlice/userBooksSlice";
import UpArrow from "../components/UpArrow";

const HomePageLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { genre, isFromResults, books } = useSelector((store) => store.books);
  const { userBooks } = useSelector((store) => store.userBooks);
  const { getGenre } = bookGenreActions;

  useEffect(() => {
    if (user && !userBooks) {
      dispatch(myBooks(user));
    }
  }, []);

  const getBooksGenre = (e) => {
    dispatch(getGenre(e.target.value));
    dispatch(getBooks(e.target.value));
  };

  useEffect(() => {
    if (books.length === 0 && !isFromResults) {
      dispatch(getBooks(genre));
    }
  }, [books]);

  return (
    <>
      <Container className="w-100 content-container">
        <Row className="d-flex mt-3 mb-4">
          <Col>
            <SelectForm genre={genre} getBooksGenre={getBooksGenre} />
          </Col>
          <Col sm={12} md={6} /* className="order-md-2" */>
            <SearchForm />
          </Col>
        </Row>
      </Container>
      <Outlet />
      <UpArrow />
    </>
  );
};
export default HomePageLayout;
