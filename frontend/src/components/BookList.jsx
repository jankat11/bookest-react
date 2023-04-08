import { Container, Row } from "react-bootstrap";
import BookCover from "./BookCover";
import LoadingSpinner from "../components/UI/Spinner";
import { useSelector } from "react-redux";

const BookList = () => {
  const { books, isLoading } = useSelector((store) => store.books);
  return (
    <>
      {!isLoading ? (
        <Container className="smooth">
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
