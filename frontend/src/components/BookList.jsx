import { Container, Row, Col } from "react-bootstrap";
import Book from "./Book";
import { Link } from "react-router-dom";
import { useLoaderData, Await, defer } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/Spinner";
import { Suspense } from "react";

const BASE_URL = "http://localhost:3000/books";

const BookList = () => {
  let { bookList } = useLoaderData();
  console.log();
  const { books, isLoading, genre } = useSelector((store) => store.books);

  const list = (initialRender) => {
    if (books.length === 0) {
      return initialRender;
    } else {
      return books;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={bookList}>
        {(loadedBooks) => {
          return !isLoading || genre === "" ? (
            <Container>
              <Row className="d-flex justify-content-center bookRow">
                {list(loadedBooks).map((book, i) => (
                  <Col key={i} xl={2} lg={3} sm={4} className="py-3 mw-50">
                    <Link
                      to={`/book/${book.primary_isbn13 || book.primary_isbn10}`}
                      className="text-decoration-none w-100"
                    >
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
            <LoadingSpinner />
          );
        }}
      </Await>
    </Suspense>
  );
};
export default BookList;

async function loaderBooks() {
  const { data } = await axios.get(BASE_URL);
  return await data;
}

export function loader() {
  return defer({
    bookList: loaderBooks(),
  });
}
