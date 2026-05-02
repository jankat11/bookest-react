import { Col, Image } from "react-bootstrap";
import defaultImage from "../assets/nocover.png";

const BookHeadlines = ({ book }) => {
  const volumeInfo = book?.volumeInfo || {};
  const authors = volumeInfo.authors || [];
  const publishedYear = volumeInfo.publishedDate?.slice(0, 4);
  const category = volumeInfo.categories?.[0];

  return (
    <Col sm={12}>
      <section className="book-detail-hero">
        <span className="book-detail-cover-frame">
          <Image
            className={`detailImage ${
              !volumeInfo.imageLinks?.thumbnail ? "defaultImage" : ""
            }`}
            src={volumeInfo.imageLinks?.thumbnail || defaultImage}
          />
        </span>
        <div className="book-detail-meta">
          <p className="book-detail-eyebrow">Book details</p>
          <h1 className="book-detail-title">{volumeInfo.title || "Untitled"}</h1>
          <div className="book-detail-authors">
            {authors.length
              ? authors.map((author) => <span key={author}>{author}</span>)
              : "Unknown author"}
          </div>
          <div className="detail-facts">
            {publishedYear && (
              <span className="detail-chip detail-chip-year">{publishedYear}</span>
            )}
            {category && (
              <span className="detail-chip detail-chip-category">{category}</span>
            )}
          </div>
        </div>
      </section>
    </Col>
  );
};
export default BookHeadlines;
