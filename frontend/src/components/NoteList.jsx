import { SlNote } from "react-icons/sl";
import { Row, Button, Col } from "react-bootstrap";
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
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="my-0 form-control note-textinput shadow-sm rounded-0"
            placeholder="Leave your note here"
            style={{ height: "90px" }}
          />
          <Button
            onClick={stickNote}
            className={`rounded-0 btn-info detail-button w-100`}
          >
            <SlNote className="p-0 mb-1" /> Stick The Note
          </Button>
        </Col>
      </Row>
      <Row className="my-3 mt-4">
        {user && (
          <>
            <p className="lead px-0">
              <strong>Your notes:</strong>
            </p>
            {bookNotes?.reviews?.map((note) => (
              <NoteItem
                key={note._id}
                id={note._id}
                content={note.content}
                openModal={openModal}
                getNoteId={getNoteId}
              />
            ))}
          </>
        )}
      </Row>
    </>
  );
};
export default NoteList;
