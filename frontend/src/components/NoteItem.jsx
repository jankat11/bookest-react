import { Card } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const NoteItem = ({ id, content, getNoteId, openModal, isDelete, timestamp }) => {
  const [isDeleteThis, setIsDeleteThis] = useState(false);

  return (
    <Card className="rounded-0 border-0 note my-0 pt-0">
      <Card.Body>
        <div className="position-relative pb-3">
          <Card.Text
            className="text-muted blockquote"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></Card.Text>
          <div className="w-100 position-absolute d-flex justify-content-end">
          <div className="small note-date-item  me-1">{timestamp}</div>
            {!isDelete || !isDeleteThis ? (
              <BsTrash3
                onClick={() => {
                  getNoteId(id);
                  openModal(true);
                  setIsDeleteThis(true);
                }}
                className=" blockquote note-delete"
                fill="#777"
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

