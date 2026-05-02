import { motion, AnimatePresence } from "framer-motion";
import { BsPinAngleFill } from "react-icons/bs";
import NoteItem from "./NoteItem";
import { NotesSkeleton } from "./UI/Skeleton";

const BookNotesPanel = ({
  bookNotes,
  isDelete,
  isNotesLoading,
  openModal,
  getNoteId,
  user,
}) => {
  if (!user) {
    return null;
  }

  if (isNotesLoading) {
    return (
      <section className="book-notes-section" aria-live="polite">
        <div className="workspace-section-header">
          <h2>Your notes</h2>
        </div>
        <NotesSkeleton />
      </section>
    );
  }

  if (!bookNotes?.reviews?.length) {
    return null;
  }

  return (
    <section className="book-notes-section" aria-live="polite">
      <div className="workspace-section-header">
        <h2>Your notes</h2>
      </div>
      <div className="px-2 shadow-sm all-note-list">
        <div className="position-absolute note-pin">
          <BsPinAngleFill fill="#369" size={35} />
        </div>

        <div className="mb-2 mt-3">
          <AnimatePresence>
            {bookNotes.reviews.map((note) => (
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
    </section>
  );
};

export default BookNotesPanel;
