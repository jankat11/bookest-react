import { SlNote } from "react-icons/sl";
import { Row, Button, Col, FloatingLabel } from "react-bootstrap";
import NoteItem from "./NoteItem";

const NoteList = ({
  bookNotes,
  stickNote,
  setNoteContent,
  noteContent,
  openModal,
  getNoteId,
  user,
}) => {
  return (
    <>
      <Row className="mt-5 ">
        <Col className="col-12 px-0">
          <FloatingLabel
            controlId="floatingTextarea"
            label={`${
              Boolean(user)
                ? "Leave your note here"
                : "Please login to stick note"
            }`}
          >
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="my-0 form-control note-textinput shadow-sm rounded-0"
              style={{ height: "90px" }}
              disabled={!Boolean(user)}
            />
          </FloatingLabel>
          <Button
            onClick={stickNote}
            className={`rounded-0 btn-info detail-button w-100`}
          >
            <SlNote className="p-0 mb-1" /> Stick The Note
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        {user && (
          <>
            <p className="blockquote px-0">
              {bookNotes?.reviews.length !== 0 && <span>Your notes:</span>}
            </p>
            <div className="mb-2 p-0">
              {bookNotes?.reviews?.map((note) => (
                <NoteItem
                  key={note._id}
                  id={note._id}
                  content={note.content}
                  openModal={openModal}
                  getNoteId={getNoteId}
                />
              ))}
            </div>
          </>
        )}
      </Row>
    </>
  );
};
export default NoteList;
