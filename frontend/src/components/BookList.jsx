import { Container, Row } from "react-bootstrap";
import BookCover from "./BookCover";
import { useLoaderData, Await, defer } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/Spinner";
import { Suspense } from "react";
const BASE_URL = import.meta.env.VITE_NYT_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const BookList = () => {
  let { bookList } = useLoaderData();
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
  const { data } = await axios.get(
    BASE_URL + "hardcover-fiction.json?api-key=" + API_KEY
  );
  return await data.results.books;
}

export function loader() {
  return defer({
    bookList: loaderBooks(),
  });
}
