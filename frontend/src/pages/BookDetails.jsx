import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook, getResult } from "../features/bookSlice/bookSlice";
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
  const { book, isLoading, isError, message, selfLink } = useSelector(
    (store) => store.book
  );
  const { isFromResults } = useSelector((store) => store.books);
  const { setBookEmpty } = bookActions;

  async function getDescription() {
    if (book.id) {
      const { data } = await axios.get(`${BASE_URL}${book.id}`);
      setDescription(data.volumeInfo.description);
    }
  }

  useEffect(() => {
    console.log(book.selfLink);
    if(!isFromResults) {
      dispatch(getBook(params.bookISBN));
    } else {
      console.log(isFromResults);
      dispatch(getResult(selfLink))
    }
    return () => {
      dispatch(setBookEmpty());
    };
  }, [isFromResults]);

  useEffect(() => {
    if (book.id) {
      getDescription();
    }
  }, [book.id]);

/*   useEffect(() => {
    if (book.selfLink) {
      dispatch(getResult(book.selfLink))
    }
    console.log(book);
  }, [book.selfLink]) */

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
        <Container className="d-flex justify-content-center w-100 h-100 my-3">
          <LoadingSpinner variant={"primary"} size={"xl"} />
        </Container>
      )}
    </>
  );
};
export default BookDetails;
