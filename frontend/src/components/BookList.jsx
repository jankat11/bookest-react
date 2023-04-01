import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/bookGenreSlice/bookGenreSlice";
import AlertMessage from "./UI/Alert";
import LoadingSpinner from "./UI/Spinner";
import { Link } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, isLoading, isError, message } = useSelector(
    (store) => store.books
  );

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Container className="d-flex justify-content-center w-100 h-100">
          <LoadingSpinner variant={"primary"} size={"xl"} />
        </Container>
      )}
      {!isError ? (
        <Container className="">
          <Row className="d-flex justify-content-center bookRow">
            {books.map((book, i) => (
              <Col key={i} xl={2} lg={3} md={4} sm={6} className="py-3 px-2 mw-50 p-0">
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
      ) : (
        <AlertMessage message={message} variant={"warning"} />
      )}
    </>
  );
};
export default BookList;
