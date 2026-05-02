import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BookCover from "./BookCover";
import { BookCardSkeleton, BookGridSkeleton } from "../components/UI/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "../features/bookGenreSlice/bookGenreSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const {
    books,
    isLoading,
    isResultsLoading,
    finishSearch,
    isFromResults,
    searchPage,
    searchWords,
  } = useSelector((store) => store.books);

  useEffect(() => {
    const target = loadMoreRef.current;
    const canLoadMore =
      target &&
      isFromResults &&
      searchWords &&
      !finishSearch &&
      !isResultsLoading &&
      !isLoading;

    if (!canLoadMore) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.unobserve(entry.target);
        dispatch(getResults({ words: searchWords, searchPage }));
      },
      {
        rootMargin: "520px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [
    dispatch,
    finishSearch,
    isFromResults,
    isLoading,
    isResultsLoading,
    searchPage,
    searchWords,
  ]);

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
        {isFromResults && !finishSearch && (
          <Col
            xs={12}
            ref={loadMoreRef}
            className="load-more-sentinel"
            aria-hidden="true"
          />
        )}
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
