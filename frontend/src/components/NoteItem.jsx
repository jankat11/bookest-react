import { Card } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const NoteItem = ({ id, content, getNoteId, openModal, isDelete, timestamp }) => {
  const [isDeleteThis, setIsDeleteThis] = useState(false);

  return (
    <Card className="rounded-0 shadow-sm note mb-3">
      <Card.Body>
        <div className="position-relative pb-3">
          <Card.Text
            className="note-text blockquote"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></Card.Text>
          <div className="w-100 position-absolute d-flex justify-content-end">
          <div className="text-secondary small  me-1">{timestamp}</div>
            {!isDelete || !isDeleteThis ? (
              <BsTrash3
                onClick={() => {
                  getNoteId(id);
                  openModal(true);
                  setIsDeleteThis(true);
                }}
                className="text-secondary blockquote note-delete"
              />
            ) : (
              isDeleteThis && (
                <Spinner size="sm" variant="secondary" animation="grow" />
              )
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default NoteItem;

