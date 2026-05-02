import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
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

  const getBooksGenre = (genreValue) => {
    dispatch(getGenre(genreValue));
    dispatch(getBooks(genreValue));
  };

  useEffect(() => {
    if (books.length === 0 && !isFromResults) {
      dispatch(getBooks(genre));
    }
  }, [books]);

  return (
    <>
      <Row className="mt-3 mb-4">
        <Col xs={12}>
          <div className="discovery-toolbar">
            <div className="discovery-toolbar-inner">
              <div className="discovery-field discovery-field-genre">
                <SelectForm genre={genre} getBooksGenre={getBooksGenre} />
              </div>
              <div className="discovery-field discovery-field-search">
                <SearchForm />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Outlet />
      <UpArrow />
    </>
  );
};
export default HomePageLayout;
