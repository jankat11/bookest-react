import { Col, Container, Row } from "react-bootstrap";

const SkeletonBlock = ({ className = "" }) => {
  return <span className={`skeleton-block ${className}`} aria-hidden="true" />;
};

export const BookCardSkeleton = () => {
  return (
    <Col xs={6} sm={6} md={4} lg={3} className="book-card-col">
      <div className="book-cover-card skeleton-card" aria-hidden="true">
        <div className="book-cover-media">
          <SkeletonBlock className="skeleton-cover" />
        </div>
        <div className="book-card-copy">
          <SkeletonBlock className="skeleton-line skeleton-line-title" />
          <SkeletonBlock className="skeleton-line skeleton-line-short mx-auto" />
        </div>
      </div>
    </Col>
  );
};

export const BookGridSkeleton = ({ count = 8 }) => {
  return (
    <Container className="smoothLittle content-container">
      <Row className="book-grid mb-5">
        {Array.from({ length: count }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </Row>
    </Container>
  );
};

export const ShelfSkeleton = () => {
  return (
    <section className="shelf-container shelf-panel my-4" aria-hidden="true">
      <div className="shelf-heading">
        <SkeletonBlock className="skeleton-line skeleton-line-heading" />
        <SkeletonBlock className="skeleton-pill" />
      </div>
      <div className="shelf-grid">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonBlock key={index} className="shelf-book-skeleton" />
        ))}
      </div>
    </section>
  );
};

export const MyBooksSkeleton = () => {
  return (
    <section className="smoothLittle mb-3 d-flex flex-column align-items-center w-100">
      <ShelfSkeleton />
      <ShelfSkeleton />
      <ShelfSkeleton />
    </section>
  );
};

export const NotesSkeleton = () => {
  return (
    <div className="px-2 all-note-list notes-skeleton" aria-hidden="true">
      <SkeletonBlock className="skeleton-line skeleton-line-heading" />
      <SkeletonBlock className="skeleton-line" />
      <SkeletonBlock className="skeleton-line skeleton-line-wide" />
      <SkeletonBlock className="skeleton-line skeleton-line-short" />
    </div>
  );
};

export const BookDetailsSkeleton = () => {
  return (
    <Container fluid className="smooth content-container book-detail-page">
      <Col xl={10} className="col-12 mx-auto p-0">
        <Row className="my-3">
          <Col sm={12}>
            <div
              className="book-detail-hero skeleton-detail-hero"
              aria-hidden="true"
            >
              <SkeletonBlock className="detail-cover-skeleton" />
              <div className="book-detail-meta">
                <SkeletonBlock className="skeleton-line skeleton-line-kicker" />
                <SkeletonBlock className="skeleton-line skeleton-line-title-lg" />
                <SkeletonBlock className="skeleton-line skeleton-line-wide" />
                <div className="detail-facts">
                  <SkeletonBlock className="skeleton-chip" />
                  <SkeletonBlock className="skeleton-chip" />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="reader-workspace" aria-hidden="true">
          <div className="reader-workspace-section shelf-workspace">
            <SkeletonBlock className="skeleton-line skeleton-line-heading" />
            <SkeletonBlock className="skeleton-segmented-control" />
            <SkeletonBlock className="skeleton-button" />
            <SkeletonBlock className="skeleton-button" />
          </div>
          <div className="reader-workspace-section note-workspace">
            <SkeletonBlock className="skeleton-line skeleton-line-heading" />
            <SkeletonBlock className="skeleton-textarea" />
            <SkeletonBlock className="skeleton-button skeleton-note-submit" />
          </div>
        </div>

        <Row className="mt-5 mb-5">
          <div
            className="description-panel skeleton-description-panel"
            aria-hidden="true"
          >
            <SkeletonBlock className="skeleton-line skeleton-line-heading" />
            <SkeletonBlock className="skeleton-line skeleton-line-wide" />
            <SkeletonBlock className="skeleton-line skeleton-line-wide" />
            <SkeletonBlock className="skeleton-line" />
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default SkeletonBlock;
