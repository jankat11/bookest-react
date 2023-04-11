import { Card } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import { Component, useState } from "react";
import { Spinner } from "react-bootstrap";



const NoteItem = ({ id, content, getNoteId, openModal, isDelete }) => {
  const [isDeleteThis, setIsDeleteThis] = useState(false)

  return (
    <Card className="rounded-0 shadow-sm note  mb-3">
      <Card.Body>
        <div className="position-relative pb-3">
          <Card.Text
            className="note-text blockquote"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></Card.Text>
          <div className="w-100 position-absolute d-flex justify-content-end">
            {!isDelete || !isDeleteThis ? (
              <BsTrash3
                onClick={() => {
                  getNoteId(id);
                  openModal(true);
                  setIsDeleteThis(true)
                }}
                className="text-secondary blockquote note-delete"
              />
            ) : (
              isDeleteThis && <Spinner size="sm" variant="secondary" animation="grow" />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default NoteItem;


/* class NoteItem extends Component {
  render() {
    return (
      <Card className="rounded-0 shadow-sm note  mb-3">
        <Card.Body>
          <div className="position-relative pb-3">
            <Card.Text
              className="note-text blockquote"
              dangerouslySetInnerHTML={{
                __html: this.props.content,
              }}
            ></Card.Text>
            <span className="w-100 position-absolute d-flex justify-content-end">
              {this.props.isDelete && this ? (
                <BsTrash3
                  onClick={() => {
                    this.props.getNoteId(this.props.id)
                    this.props.openModal(true)
                  }}
                  className="text-secondary blockquote note-delete"
                />
              ) : (
                <Spinner size="sm" animation="grow" />
              )}
            </span>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default NoteItem; */
