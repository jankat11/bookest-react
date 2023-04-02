import { useState, useEffect } from "react";
import { Outlet, Await } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { getBooks } from "../features/bookGenreSlice/bookGenreSlice";
import SearchForm from "../components/SearchForm";
import SelectForm from "../components/SelectForm";

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
        <Row className="d-flex">
        <Col sm={12} md={6} className="order-md-2">
          <SearchForm />
        </Col>
          <Col>
            <SelectForm genre={genre} getBooksGenre={getBooksGenre}/>
          </Col>
        </Row>
      </Container>
      {show && <Outlet />}
    </>
  );
};
export default HomePageLayout;


