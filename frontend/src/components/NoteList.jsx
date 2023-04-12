import { SlNote } from "react-icons/sl";
import { Row, Button, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import NoteItem from "./NoteItem";
import LoadingBar from "./UI/LoadingBar";

const NoteList = ({
  bookNotes,
  isDelete,
  stickNote,
  setNoteContent,
  isNoteLoading,
  isNotesLoading,
  noteContent,
  openModal,
  getNoteId,
  user,
}) => {
  return (
    <>
      <Row className="mt-5 ">
        <Col className="col-12">
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
            {!isNoteLoading ? (
              <>
                <SlNote className="p-0 mb-1" /> <span>Stick The Note</span>
              </>
            ) : (
              <LoadingBar />
            )}
          </Button>
        </Col>
      </Row>
      <Row className="my-4">
        {user && (
          <>
            {bookNotes?.reviews.length !== 0 ? (
              <span>
                {!isNotesLoading ? (
                  <p className="blockquote text-muted px-0"><SlNote className="p-0 mb-1" /> Your notes:</p>
                ) : (
                  <LoadingBar />
                )}
              </span>
            ) : (
              <p className="blockquote text-muted"><SlNote className="p-0 mb-1" /> No notes yet!</p>
            )}

            <div className="mb-2">
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
                      isDelete={isDelete}
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
