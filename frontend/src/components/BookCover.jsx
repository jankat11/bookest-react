import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bookActions } from "../features/bookSlice/bookSlice";
import { useDispatch } from "react-redux";


const BookCover = ({ image, title, author, isbn10, isbn13, google_id, selfLink}) => {
  const {getSelfLink} = bookActions
  const dispatch = useDispatch()
  const handleClick = () => {
    if(selfLink) {
      dispatch(getSelfLink(selfLink))
    }
  }

  return (
    <Col xl={2} lg={3} sm={4} onClick={handleClick} className="py-3 mw-50 hide">
      <Link
        to={`/book/${isbn13 || isbn10 || google_id}`}
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
