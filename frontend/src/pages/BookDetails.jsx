import { useEffect, useState, useRef, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook, getResult } from "../features/bookSlice/bookSlice";
import { bookActions } from "../features/bookSlice/bookSlice";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
import LoadingSpinner from "../components/UI/Spinner";
import AlertMessage from "../components/UI/Alert";
import BookHeadlines from "../components/BookHeadlines";
import { addBook } from "../features/userBooksSlice/userBooksSlice";
import {
  shelfInitialState,
  shelfReducer,
} from "../features/bookDetailsReducer";
import { userBooksActions } from "../features/userBooksSlice/userBooksSlice";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes/";
const google_id_length = 12; // current google's book id length
const imageDesignHeight = 208; // 13rem * 16 -> 13 * 16px

const BookDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState();
  const [state, shelfDispatch] = useReducer(shelfReducer, shelfInitialState);
  const { setUserBooks } = userBooksActions;
  const { book, isLoading, isError, message, selfLink } = useSelector(
    (store) => store.book
  );
  const { isFromResults } = useSelector((store) => store.books);
  const { setBookEmpty } = bookActions;
  const {
    user: { token },
  } = useSelector((store) => store.user);
  async function getDescription() {
    if (book.id) {
      const { data } = await axios.get(`${BASE_URL}${book.id}`);
      setDescription(data.volumeInfo.description);
    }
  }

  const addToBookShelf = () => {
    dispatch(addBook({ token, state })).then(() => navigate("/mybooks"))
  };

  const handleCheckBoxes = (e) => {
    shelfDispatch({ type: "SWITCH_CHECKBOXES", payload: e.target.name });
  };

  useEffect(() => {
    if (params.bookISBN.length === google_id_length) {
      dispatch(getBook({ isbn: null, id: params.bookISBN }));
    } else if (!isFromResults) {
      dispatch(getBook({ isbn: params.bookISBN, id: null }));
    } else {
      dispatch(getResult(selfLink));
    }
    return () => {
      dispatch(setBookEmpty());
    };
  }, [isFromResults]);

  useEffect(() => {
    if (book.id && !isFromResults) {
      getDescription();
    }
  }, [book.id]);

  useEffect(() => {
    const bookData = {
      googleId: book?.id,
      title: book?.volumeInfo?.title,
      isbn: book?.volumeInfo?.industryIdentifiers
        ? book?.volumeInfo?.industryIdentifiers[0]?.identifier
        : null,
      noCover: Boolean(!book?.volumeInfo?.imageLinks?.thumbnail),
    };
    shelfDispatch({ type: "ADD_BOOK_IDS", payload: bookData });
  }, [book]);

  if (isError) {
    return (
      <AlertMessage
        variant={"danger"}
        message={message}
        title="Something went wrong!"
      />
    );
  }

  useEffect(() => {
    if (imageRef?.current?.offsetHeight === imageDesignHeight) {
      setShow(true);
    }
  }, [imageRef?.current?.offsetHeight, imageRef?.current?.offsetWidth, show]);

  return (
    <>
      {!isLoading ? (
        <Container className={`px-3 smooth ${!show && "opacity-0"}`}>
          <Row className="my-3">
            <p className="display-6">
              <strong>{book?.volumeInfo?.title}</strong>
            </p>
            <Col className="d-flex w-100 mt-3 " sm={12}>
              <Image
                className="detailImage w-100"
                ref={imageRef}
                src={book?.volumeInfo?.imageLinks?.thumbnail || ""}
              />
              <BookHeadlines book={book?.volumeInfo} />
            </Col>
          </Row>
          <Row>
            <Container>
              <div key="default-checkbox" className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="will be read"
                  name="will_be_read"
                  value={state.willBeRead}
                  checked={state.willBeRead}
                  onChange={handleCheckBoxes}
                />

                <Form.Check
                  type="checkbox"
                  label="has been read"
                  id="disabled-default-checkbox"
                  name="has_been_read"
                  value={state.hasBeenRead}
                  checked={state.hasBeenRead}
                  onChange={handleCheckBoxes}
                />
              </div>
              <Button
                type="button"
                className="rounded-0 "
                onClick={addToBookShelf}
              >
                Add To Bookshelf
              </Button>
            </Container>
          </Row>
          <Row>
            <p
              dangerouslySetInnerHTML={{
                __html: !isFromResults
                  ? description
                  : book?.volumeInfo?.description,
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
