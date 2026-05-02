import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bookActions } from "../features/bookSlice/bookSlice";
import { useDispatch } from "react-redux";
import defaultImage from "../assets/nocover.png";
const BookCover = ({
  image,
  title,
  author,
  isbn10,
  isbn13,
  google_id,
  selfLink,
  search,
}) => {
  const { getSelfLink } = bookActions;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (selfLink) {
      dispatch(getSelfLink(selfLink));
    }
  };
  const displayTitle =
    title?.length > 34 ? `${title.slice(0, 34)}...` : title || "no title";
  const displayAuthor =
    typeof author !== "string" && author?.length > 1
      ? `${author[0]}...`
      : author || "no author info";

  return (
    <Col
      xs={6}
      sm={6}
      md={4}
      lg={3}
      onClick={handleClick}
      className="book-card-col"
    >
      <Link
        to={`/book/${isbn13 || isbn10 || google_id}`}
        className="book-card-link text-decoration-none w-100"
      >
        <Card className="h-100 w-100 book-cover-card">
          <span className={`book-cover-media ${search ? "is-search" : ""}`}>
            <Card.Img
              className={`book-cover-image mx-auto ${!image ? "defaultImage" : ""}`}
              loading="lazy"
              src={image || defaultImage}
            />
          </span>
          <Card.Body className="book-card-copy text-dark border-0 w-100 d-flex flex-column justify-content-start">
            <Card.Title className="book-card-title text-center w-100 border-0">
              {displayTitle}
            </Card.Title>
            <Card.Text className="book-card-author text-center">
              {displayAuthor}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
export default BookCover;
