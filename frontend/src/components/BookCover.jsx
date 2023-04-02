import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const BookCover = ({ image, title, author, isbn10, isbn13 }) => {
  return (
    <Col xl={2} lg={3} sm={4} className="py-3 mw-50">
      <Link
        to={`/book/${isbn13 || isbn10}`}
        className="text-decoration-none w-100"
      >
        <Card className="h-100 w-100 rounded-0 border-0 shadow">
          <Card.Img className="rounded-0" variant="top" src={image} />
          <Card.Body className="bg-light w-100 d-flex flex-column justify-content-start">
            <Card.Title className="py-0 my-0 text-center w-100 ">
              {title.length > 25
                ? title.slice(0, 25) + "..."
                : title || "no title"}
            </Card.Title>
            <Card.Text className="py-0 my-0 text-center">
              {author || "no author info"}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
export default BookCover;