import { SlNote } from "react-icons/sl";
import { Row, Button, Col, Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import NoteItem from "./NoteItem";
import LoadingBar from "./UI/LoadingBar";
import { BsPinAngleFill } from "react-icons/bs";
import { useEffect } from "react";

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
  useEffect(() => {
    /* console.log("notes: ", bookNotes?.reviews.length); */
  }, [bookNotes?.reviews.length]);

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
            disabled={isNoteLoading}
            onClick={stickNote}
            className={`rounded-0  py-2 btn-info detail-button w-100`}
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
      {user && (
        <>
          {bookNotes?.reviews.length !== 0 && bookNotes !== null && (
            <div className="my-5 container px-2 shadow-sm all-note-list">
              <div className="position-absolute note-pin">
                <BsPinAngleFill fill="#369" size={35} />
              </div>

              {!isNotesLoading ? (
                <div className="mb-2 mt-3">
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
                          timestamp={note.time}
                          content={note.content}
                          openModal={openModal}
                          getNoteId={getNoteId}
                          isDelete={isDelete}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="note-loadingbar d-flex  justify-content-center opacity-25">
                  <LoadingBar />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default NoteList;
