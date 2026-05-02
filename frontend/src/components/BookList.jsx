import { Container, Row } from "react-bootstrap";
import BookCover from "./BookCover";
import { BookCardSkeleton, BookGridSkeleton } from "../components/UI/Skeleton";
import { useSelector } from "react-redux";

const BookList = () => {
  const {
    books,
    isLoading,
    isResultsLoading,
    finishSearch,
    isFromResults,
    searchPage,
  } = useSelector((store) => store.books);

  if (isLoading) {
    return <BookGridSkeleton />;
  }

  return (
    <Container className="smoothLittle content-container">
      <Row className={`book-grid ${!isResultsLoading ? "mb-5" : ""}`}>
        {books.map((book, i) => (
          <BookCover
            key={`${book.primary_isbn13 || book.google_id || book.title}-${i}`}
            image={book.book_image}
            title={book.title}
            author={book.author}
            isbn13={book.primary_isbn13}
            isbn10={book.primary_isbn10}
            google_id={book.google_id}
            selfLink={book.selfLink}
            search={isFromResults}
          />
        ))}
        {isResultsLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <BookCardSkeleton key={`more-${index}`} />
          ))}
        {finishSearch && isFromResults && (
          <p className="result-end-message">
            {searchPage !== 2 ? "end of results" : "no result"}
          </p>
        )}
      </Row>
    </Container>
  );
};
export default BookList;
