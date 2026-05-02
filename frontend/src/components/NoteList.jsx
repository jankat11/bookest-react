import { SlNote } from "react-icons/sl";
import { Button } from "react-bootstrap";
import LoadingBar from "./UI/LoadingBar";

const NoteList = ({
  stickNote,
  setNoteContent,
  isNoteLoading,
  noteContent,
  user,
}) => {
  return (
    <div className="note-composer">
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="my-0 form-control note-textinput"
        disabled={!Boolean(user)}
        placeholder={
          Boolean(user) ? "Leave your note here" : "Please login to stick note"
        }
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
  );
};

export default NoteList;
