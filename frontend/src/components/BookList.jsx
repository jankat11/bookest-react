import { useCallback, useEffect, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
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
    isError,
    message,
    activeSearchRequest,
    loadMoreError,
    loadMoreMessage,
  } = useSelector((store) => store.books);

  const handleLoadMore = useCallback(() => {
    if (
      activeSearchRequest ||
      isLoading ||
      isResultsLoading ||
      !isFromResults ||
      !searchWords ||
      finishSearch
    ) {
      return;
    }

    dispatch(getResults({ words: searchWords, searchPage }));
  }, [
    activeSearchRequest,
    dispatch,
    finishSearch,
    isFromResults,
    isLoading,
    isResultsLoading,
    searchPage,
    searchWords,
  ]);

  useEffect(() => {
    const target = loadMoreRef.current;
    const canAutoLoadMore =
      target &&
      isFromResults &&
      searchWords &&
      !finishSearch &&
      !activeSearchRequest &&
      !isResultsLoading &&
      !isLoading &&
      !loadMoreError;

    if (!canAutoLoadMore) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          handleLoadMore();
        }
      },
      {
        rootMargin: "240px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [
    activeSearchRequest,
    finishSearch,
    handleLoadMore,
    isFromResults,
    isLoading,
    isResultsLoading,
    loadMoreError,
    searchWords,
  ]);

  if (isLoading) {
    return <BookGridSkeleton />;
  }

  return (
    <Row className={!isResultsLoading ? "mb-5" : ""}>
      <Col xs={12}>
        <div className="book-grid smoothLittle">
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
        </div>

        {loadMoreError && isFromResults && (
          <div className="load-more-status">
            <p>{loadMoreMessage}</p>
            <Button
              variant="info"
              type="button"
              className="load-more-retry-button"
              onClick={handleLoadMore}
              disabled={Boolean(activeSearchRequest)}
            >
              Try again
            </Button>
          </div>
        )}

        {isFromResults && !finishSearch && !loadMoreError && (
          <div
            ref={loadMoreRef}
            className="load-more-sentinel"
            aria-hidden="true"
          />
        )}

        {finishSearch && isFromResults && !loadMoreError && (
          <p className={`result-end-message ${isError ? "is-error" : ""}`}>
            {isError ? message : searchPage !== 2 ? "end of results" : "no result"}
          </p>
        )}
      </Col>
    </Row>
  );
};
export default BookList;
