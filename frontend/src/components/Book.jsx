import { Card } from "react-bootstrap";

const Book = ({ image, title, author }) => {
  return (
    <Card className="h-100 w-100">
      <Card.Img variant="top" src={image} />
      <Card.Body className="bg-light w-100">
        <Card.Title className="py-0 my-0 text-center w-100 ">
          {title.length > 20 ? title.slice(0, 20) + "..." : title || "no title"}
        </Card.Title>
        <Card.Text className="py-0 my-0  text-center">
          {author || "no author info"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Book;
