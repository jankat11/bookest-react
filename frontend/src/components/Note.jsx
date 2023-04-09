import { SlNote } from "react-icons/sl";
import { Row, Button, Card } from "react-bootstrap";

const Note = ({
  bookNotes,
  stickNote,
  setNoteContent,
  noteContent,
  removeButton,
}) => {
  return (
    <>
      <Row className="mt-3 ">
        <>
          <Button
            onClick={stickNote}
            className={`rounded-0 btn-info detail-button  ${
              removeButton ? "mt-md-0" : "mt-sm-0"
            }`}
          >
            <SlNote className="p-0 mb-1" /> Stick a Note
          </Button>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="my-4 form-control note-textinput shadow-sm rounded-0"
            placeholder="Leave your note here"
            style={{ height: "90px" }}
          />
        </>
      </Row>
      <Row className="mb-3">
        <p className="lead">Your notes:</p>
        {bookNotes?.reviews?.map((note) => (
          <Card key={note.id} className="rounded-0 shadow-sm note border mb-3">
            <Card.Body>
              <Card.Text>
                <p
                  dangerouslySetInnerHTML={{
                    __html: note.content,
                  }}
                ></p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </>
  );
};
export default Note;
