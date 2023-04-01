import { Container, Row, Col } from "react-bootstrap";
import Book from "./Book";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/Spinner";

const BASE_URL = "http://localhost:3000/books";

const BookList = () => {
  let bookList = useLoaderData(null);
  const { books, isLoading, genre } = useSelector((store) => store.books);

  const list = () => {
    if (books.length === 0) {
      return bookList;
    } else {
      return books;
    }
  };

  return (
    <>
      {(!isLoading || genre === "") ? (
        <Container className="">
          <Row className="d-flex justify-content-center bookRow">
            {list().map((book, i) => (
              <Col key={i} xl={2} lg={3} md={4} sm={6} className="py-3 mw-50">
                <Link
                  to={`/book/${book.primary_isbn13 || book.primary_isbn10}`}
                  className="text-decoration-none w-100"
                >
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
      ) : (
        <Container className="d-flex justify-content-center w-100 h-100 my-3">
          <LoadingSpinner variant={"primary"} size={"xl"} />
        </Container>
      )}
    </>
  );
};
export default BookList;

export const loader = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};
