import { Container, Row, Col } from "react-bootstrap";
import BookCover from "./BookCover";
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
                  <BookCover
                    key={i}
                    image={book.book_image}
                    title={book.title}
                    author={book.author}
                    isbn13={book.primary_isbn13}
                    isbn10={book.primary_isbn10}
                  />
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
