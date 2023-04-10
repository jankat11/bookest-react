import { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks as myBooks } from "../features/userBooksSlice/userBooksSlice";
import LoadingSpinner from "../components/UI/Spinner";
import AlertMessage from "../components/UI/Alert";
import BookHeadlines from "../components/BookHeadlines";
import { addBook } from "../features/userBooksSlice/userBooksSlice";
import { removeBook } from "../features/userBooksSlice/userBooksSlice";
import NoteList from "../components/NoteList";
import ShiftButtons from "../components/ShiftButtons";
import { toast } from "react-toastify";
import Modal from "../components/UI/Modal";

import uuid from "react-uuid";
import { userBooksActions } from "../features/userBooksSlice/userBooksSlice";
import {
  addNote,
  getNotes,
  getBook,
  getResult,
  deleteNote,
  bookActions,
} from "../features/bookSlice/bookSlice";
import {
  shelfInitialState,
  shelfReducer,
} from "../features/bookDetailsReducer";
import { Container, Row, Col } from "react-bootstrap";

const google_id_length = 12; // current google's book id length

const BookDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [removeButton, setRemoveButton] = useState(false);
  const [state, shelfDispatch] = useReducer(shelfReducer, shelfInitialState);
  const { isFromResults } = useSelector((store) => store.books);
  const { user } = useSelector((store) => store.user);
  const [noteContent, setNoteContent] = useState("");
  const { setEmptyRemoveMessage } = userBooksActions;
  const { setBookEmpty } = bookActions;
  const { userBooks, isRemoving, removeMessage, isBookError } = useSelector(
    (store) => store.userBooks
  );
  const { book, isLoading, isError, message, selfLink, bookNotes } =
    useSelector((store) => store.book);

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
        if (data.meta.requestStatus === "fulfilled") {
          toast.success("book removed!", { autoClose: 1500 });
          setRemoveButton(false);
        } else if (data.meta.requestStatus === "rejected") {
          toast.warning("something went wrong:( try later", {
            autoClose: 2500,
          });
        }
      }
    );
  };

  const stickNote = () => {
    if (!user) {
      navigate("/login/?mode=login");
    } else if (!noteContent.trim()) {
      return;
    } else {
      const { willBeRead, hasBeenRead, ...bookCredentials } = state;
      const noteItem = {
        ...bookCredentials,
        content: noteContent,
        _id: uuid(),
      };
      dispatch(addNote({ user, noteItem })).then((data) => {
        if (data.meta.requestStatus === "rejected") {
          toast.warning("something went wrong:( try later", {
            autoClose: 2500,
          });
        } else if (data.meta.requestStatus === "fulfilled") {
          toast.success("Your note added", { autoClose: 1500 });
          setNoteContent("");
        }
      });
    }
  };

  const handleDeleteNote = () => {
    setShowModal(false);
    const noteData = { user, noteId };
    dispatch(deleteNote(noteData)).then((data) => {
      if (data.meta.requestStatus === "rejected") {
        toast.warning("something went wrong:( try later", {
          autoClose: 2500,
        });
      } else if (data.meta.requestStatus === "fulfilled") {
        toast.success("Note deleted!", { autoClose: 1500 });
      }
    });
  };

  useEffect(() => {
    if (user && state.googleId) {
      const { willBeRead, hasBeenRead, ...bookItem } = state;
      dispatch(getNotes({ user, bookItem }));
    }
  }, [state.googleId]);

  useEffect(() => {
    if (user && !userBooks) {
      dispatch(myBooks(user));
    }
    return () => {
      dispatch(setBookEmpty());
    };
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

  return (
    <>
      {!isLoading ? (
        <Container
          fluid
          className={`px-3 smooth ${
            !show && "opacity-0"
          } w-100 d-flex justify-content-center`}
        >
          {showModal && (
            <Modal
              header={"Delete note?"}
              confirmText={"Delete"}
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleConfirm={handleDeleteNote}
            />
          )}
          <Col xl={9} className="col-12 p-o">
            <Row className="my-3">
              <BookHeadlines book={book} setShow={setShow} show={show} />
            </Row>
            <Row>
              <ShiftButtons
                addToBookShelf={addToBookShelf}
                handleCheckBoxes={handleCheckBoxes}
                handleRemove={handleRemove}
                removeButton={removeButton}
                isRemoving={isRemoving}
                state={state}
              />
            </Row>
            <NoteList
              bookNotes={bookNotes}
              stickNote={stickNote}
              setNoteContent={setNoteContent}
              noteContent={noteContent}
              removeButton={removeButton}
              getNoteId={setNoteId}
              openModal={setShowModal}
              user={user}
            />
            <Row>
              <p
                dangerouslySetInnerHTML={{
                  __html: book?.volumeInfo?.description,
                }}
                className="lead"
              ></p>
            </Row>
          </Col>
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
