import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/bookGenreSlice/bookGenreSlice";
import AlertMessage from "./UI/Alert";
import LoadingSpinner from "./UI/Spinner";
import { Link } from "react-router-dom";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000/books";

const BookList = () => {
  const dispatch = useDispatch();
  const bookList = useLoaderData();
  const { setBooks } = bookGenreActions;

  /*   const { books, isLoading, isError, message } = useSelector(
    (store) => store.books
  ); */

  useEffect(() => {
    dispatch(setBooks(bookList));
  }, [dispatch]);

  return (
    <>
      {/*         <Container className="d-flex justify-content-center w-100 h-100">
          <LoadingSpinner variant={"primary"} size={"xl"} />
        </Container> */}

      <Container className="">
        <Row className="d-flex justify-content-center bookRow">
          {bookList.map((book, i) => (
            <Col
              key={i}
              xl={2}
              lg={3}
              md={4}
              sm={6}
              className="py-3 px-2 mw-50 p-0"
            >
              <Link to={"/book"} className="text-decoration-none w-100">
                <Book
                  image={book.book_image}
                  title={book.title}
                  author={book.author}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* <AlertMessage message={message} variant={"warning"} /> */}
    </>
  );
};
export default BookList;

export const loader = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};
