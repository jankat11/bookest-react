import { Card } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";

const NoteItem = ({ id, content, getNoteId, openModal }) => {
  return (
    <Card className="rounded-0 shadow note border-0 mb-3">
      <Card.Body>
        <div className="position-relative pb-3">
          <div className="position-absolute clipCorner border-0 shadow"></div>
          <Card.Text
            className="note-text blockquote"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></Card.Text>
          <div className="w-100 position-absolute d-flex justify-content-end">
            <BsTrash3
              onClick={() => {
                getNoteId(id);
                openModal(true);
              }}
              className="text-secondary blockquote note-delete"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default NoteItem;
