import { Container, Row } from "react-bootstrap";
import BookCover from "./BookCover";
import LoadingSpinner from "../components/UI/Spinner";
import { useSelector } from "react-redux";

const BookList = () => {
  const { books, isLoading, isResultsLoading, finishSearch, isFromResults, searchPage } = useSelector(
    (store) => store.books
  );
  return (
    <>
      {!isLoading ? (
        <Container className="smoothLittle content-container">
          <Row className={`d-flex justify-content-center bookRow ${!isResultsLoading && "mb-4"}`}>
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
            {isResultsLoading && (
              <LoadingSpinner classes={"more-results-spinner"} />
            )}
            {(finishSearch && isFromResults) && (
              <p className="display-6 blockquote text-secondary text-center my-1">
                {searchPage !== 2 ? "end of results" : "no result"}
              </p>
            )}
          </Row>
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default BookList;
