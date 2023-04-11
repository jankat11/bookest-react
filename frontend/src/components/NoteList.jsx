import { SlNote } from "react-icons/sl";
import { Row, Button, Col, FloatingLabel } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
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
            style={{ height: "90px" }}
            disabled={!Boolean(user)}
            placeholder={`${
              Boolean(user)
                ? "Leave your note here"
                : "Please login to stick note"
            }`}
          />

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
            <p className="blockquote text-muted px-0">
              {bookNotes?.reviews.length !== 0 && <span>Your notes:</span>}
            </p>
            <div className="mb-2 p-0">
              <AnimatePresence>
                {bookNotes?.reviews?.map((note) => (
                  <motion.div
                    key={note._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <NoteItem
                      id={note._id}
                      content={note.content}
                      openModal={openModal}
                      getNoteId={getNoteId}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </Row>
    </>
  );
};
export default NoteList;
