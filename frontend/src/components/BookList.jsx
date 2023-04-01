import { Container, Row, Col } from "react-bootstrap";
import Book from "./Book";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000/books";

const BookList = () => {
  const bookList = useLoaderData(null);

  return (
    <>
      <Container className="">
        <Row className="d-flex justify-content-center bookRow">
          {bookList.map((book, i) => (
            <Col
              key={i}
              xl={2}
              lg={3}
              md={4}
              sm={6}
              className="py-3 px-2 mw-50 p-0"
            >
              <Link to={"/book"} className="text-decoration-none w-100">
                <Book
                  image={book.book_image}
                  title={book.title}
                  author={book.author}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default BookList;

export const loader = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

{
  /* {!isLoading && <Container className="d-flex justify-content-center w-100 h-100">
        <LoadingSpinner variant={"primary"} size={"xl"} />
      </Container>} */
}
