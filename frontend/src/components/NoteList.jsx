import { SlNote } from "react-icons/sl";
import { Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import NoteItem from "./NoteItem";
import LoadingBar from "./UI/LoadingBar";
import { NotesSkeleton } from "./UI/Skeleton";
import { BsPinAngleFill } from "react-icons/bs";

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
      <div className="note-composer">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="my-0 form-control note-textinput"
          disabled={!Boolean(user)}
          placeholder={`${
            Boolean(user) ? "Leave your note here" : "Please login to stick note"
          }`}
        />

        <Button
          variant="positive"
          disabled={isNoteLoading}
          onClick={stickNote}
          className="py-2 detail-button note-submit-button w-100"
        >
          {!isNoteLoading ? (
            <>
              <SlNote className="p-0 mb-1" /> <span>Stick The Note</span>
            </>
          ) : (
            <LoadingBar />
          )}
        </Button>
      </div>
      {user && (
        <>
          {isNotesLoading ? (
            <NotesSkeleton />
          ) : (
            Boolean(bookNotes?.reviews?.length) && (
              <div className="px-2 shadow-sm all-note-list">
                <div className="position-absolute note-pin">
                  <BsPinAngleFill fill="#369" size={35} />
                </div>

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
              </div>
            )
          )}
        </>
      )}
    </>
  );
};
export default NoteList;
