import { Container, Row } from "react-bootstrap";
import BookCover from "./BookCover";
import LoadingSpinner from "../components/UI/Spinner";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const BookList = () => {
  const dispatch = useDispatch()
  const { books, isLoading, genre, isFromResults } = useSelector((store) => store.books);
  const { getGenre } = bookGenreActions;
 

  return (
    <>
      {!isLoading ? (
        <Container>
          <Row className="d-flex justify-content-center bookRow">
            {books.map((book, i) => (
              <BookCover
              key={i}
              image={book.book_image}
              title={book.title}
              author={book.author}
              isbn13={book.primary_isbn13}
              isbn10={book.primary_isbn10}
              google_id={book.google_id}
              selfLink={book.selfLink} 
              />
            ))}
          </Row>
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default BookList;

