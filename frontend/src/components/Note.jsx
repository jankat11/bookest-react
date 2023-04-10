import { SlNote } from "react-icons/sl";
import { Row, Button, Card, Col } from "react-bootstrap";

const Note = ({ bookNotes, stickNote, setNoteContent, noteContent }) => {
  return (
    <>
      <Row className="mt-5 ">
        <Col className="col-12 px-0" lg={7}>
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
        <p className="lead px-0">
          <strong>Your notes:</strong>
        </p>
        {bookNotes?.reviews?.map((note) => (
          <Card key={note.id} className="rounded-0 shadow-sm note border mb-3">
            <Card.Body>
              <Card.Text
                className="note-text"
                dangerouslySetInnerHTML={{
                  __html: note.content,
                }}
              ></Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </>
  );
};
export default Note;
