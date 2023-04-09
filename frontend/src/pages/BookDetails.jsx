import { useEffect, useState, useRef, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook, getResult } from "../features/bookSlice/bookSlice";
import { getBooks as myBooks } from "../features/userBooksSlice/userBooksSlice";
import { bookActions } from "../features/bookSlice/bookSlice";
import LoadingSpinner from "../components/UI/Spinner";
import AlertMessage from "../components/UI/Alert";
import BookHeadlines from "../components/BookHeadlines";
import { addBook } from "../features/userBooksSlice/userBooksSlice";
import { removeBook } from "../features/userBooksSlice/userBooksSlice";
import { SlNote } from "react-icons/sl";
import { ImBooks } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";
import { toast } from "react-toastify";
import defaultImage from "../../public/nocover.png";
import CheckBoxes from "../components/CheckBoxes";
import { userBooksActions } from "../features/userBooksSlice/userBooksSlice";
import {
  shelfInitialState,
  shelfReducer,
} from "../features/bookDetailsReducer";
import {
  Container,
  Spinner,
  Image,
  Row,
  Col,
  Button,
  Form,
  Card,
} from "react-bootstrap";

const google_id_length = 12; // current google's book id length
const imageDesignHeight = 195; // 12.18rem * 16 -> 13 * 16px

const BookDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);
  const [state, shelfDispatch] = useReducer(shelfReducer, shelfInitialState);
  const { isFromResults } = useSelector((store) => store.books);
  const { user } = useSelector((store) => store.user);
  const { setEmptyRemoveMessage } = userBooksActions;
  const { userBooks, isRemoving, removeMessage, isBookError } = useSelector(
    (store) => store.userBooks
  );
  const { setBookEmpty } = bookActions;
  const { book, isLoading, isError, message, selfLink } = useSelector(
    (store) => store.book
  );

  const addToBookShelf = () => {
    if (!user) {
      navigate("/login/?mode=login");
    } else {
      dispatch(addBook({ user, state })).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          toast.success("Added to bookshelf!", { autoClose: 1500 });
        }
      });
    }
  };

  const handleCheckBoxes = (e) => {
    shelfDispatch({ type: "SWITCH_CHECKBOXES", payload: e.target.name });
  };

  const handleRemove = () => {
    dispatch(removeBook({ bookId: book.id, token: user.token })).then(
      (data) => {
        setRemoveButton(false);
        toast.success("book removed!", { autoClose: 1500 });
      }
    );
  };

  const stickNote = () => {
    if (!user) {
      navigate("/login/?mode=login");
    }
  };

  useEffect(() => {
    if (user && !userBooks) {
      dispatch(myBooks(user));
    }
  }, []);

  useEffect(() => {
    if (removeMessage && isBookError) {
      toast.warning(removeMessage.replaceAll("_", " "), { autoClose: 2500 });
      dispatch(setEmptyRemoveMessage());
    }
  }, [removeMessage, isBookError]);

  useEffect(() => {
    if (userBooks) {
      let check = false;
      userBooks["will_be_read"].forEach((userBook) => {
        if (userBook.id == book.id) {
          setRemoveButton(true);
          check = true;
          return;
        }
      });
      if (!check) {
        userBooks["has_been_read"].forEach((userBook) => {
          if (userBook.id == book.id) {
            setRemoveButton(true);
            check = true;
            return;
          }
        });
      }
    }
  }, [book, userBooks]);

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
    const bookData = {
      googleId: book?.id,
      title: book?.volumeInfo?.title,
      isbn: book?.volumeInfo?.industryIdentifiers
        ? book?.volumeInfo?.industryIdentifiers[0]?.identifier
        : "no-isbn",
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
              <span style={{ width: "128px", height: "195px" }}>
                <Image
                  className="detailImage"
                  ref={imageRef}
                  src={book?.volumeInfo?.imageLinks?.thumbnail || defaultImage}
                />
              </span>
              <BookHeadlines book={book?.volumeInfo} />
            </Col>
          </Row>
          <Row>
            <Col className="col-12 p-0">
              <CheckBoxes handleCheckBoxes={handleCheckBoxes} state={state} />
              <Col className="col-12 mt-3">
                <Button
                  type="button"
                  className="rounded-0 btn-info me-3 detail-button"
                  onClick={addToBookShelf}
                >
                  <ImBooks className="mb-1" /> Add To Bookshelf
                </Button>
                {removeButton && (
                  <Button
                    onClick={handleRemove}
                    className="me-3 mt-3 mt-sm-0 btn-danger rounded-0 detail-button"
                  >
                    {!isRemoving ? (
                      <>
                        <CgPlayListRemove
                          style={{
                            scale: "1.5",
                            position: "relative",
                            top: "2px",
                          }}
                          className="mb-1"
                        />
                        <span>Remove From Bookshelf</span>{" "}
                      </>
                    ) : (
                      <Spinner size="sm" animation="grow" />
                    )}
                  </Button>
                )}
                <Button
                  onClick={stickNote}
                  className={`rounded-0 btn-info detail-button mt-3 ${
                    removeButton ? "mt-md-0" : "mt-sm-0"
                  }`}
                >
                  <SlNote className="p-0 mb-1" /> Stick a Note
                </Button>
              </Col>
            </Col>
          </Row>
          <Row className="my-5">
            <p className="display-6">Your notes:</p>
            <Card className="rounded-0 shadow note border ">
              <Card.Body>
                <Card.Text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magni velit, repudiandae illum ex laboriosam magnam voluptate
                  quisquam repellendus, modi corrupti consequuntur, possimus et.
                  Officia maiores, laudantium id architecto nostrum enim
                  deserunt voluptatem fuga necessitatibus veritatis delectus
                  doloribus quidem alias nihil excepturi cum quaerat quis.
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <p
              dangerouslySetInnerHTML={{
                __html: book?.volumeInfo?.description,
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
