import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../features/bookSlice/bookSlice";
import { bookActions } from "../features/bookSlice/bookSlice";
import { Container, Image, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/UI/Spinner";
import AlertMessage from "../components/UI/Alert";
import BookHeadlines from "../components/BookHeadlines";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes/";

const BookDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [description, setDescription] = useState();
  const { book, isLoading, isError, message } = useSelector(
    (store) => store.book
  );
  const { setBookEmpty } = bookActions;

  async function getDescription() {
    if (book.id) {
      const { data } = await axios.get(`${BASE_URL}${book.id}`);
      setDescription(data.volumeInfo.description);
    }
  }

  useEffect(() => {
    dispatch(getBook(params.bookISBN));
    return () => {
      dispatch(setBookEmpty());
    };
  }, [dispatch]);

  useEffect(() => {
    getDescription();
  }, [book.id]);

  if (isError) {
    return (
      <AlertMessage
        variant={"danger"}
        message={message}
        title="Something went wrong!"
      />
    );
  }

  return (
    <>
      {!isLoading ? (
        <Container className="px-3">
          <Row className="my-3">
            <p className="display-6">
              <strong>{book?.volumeInfo?.title}</strong>
            </p>
            <Col className="d-flex w-100 mt-3" sm={12}>
              <Image src={book?.volumeInfo?.imageLinks.thumbnail || ""} />
              <BookHeadlines book={book?.volumeInfo} />
            </Col>
          </Row>
          <Row>
            <p
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="lead my-3"
            ></p>
          </Row>
        </Container>
      ) : (
        <Container className="d-flex justify-content-center w-100 h-100">
          <LoadingSpinner variant={"primary"} size={"xl"} />
        </Container>
      )}
    </>
  );
};
export default BookDetails;
