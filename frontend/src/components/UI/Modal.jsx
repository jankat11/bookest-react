import { Modal, Button } from "react-bootstrap";

const ModalSection = ({
  show,
  handleConfirm,
  handleClose,
  confirmText,
  header,
  body,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          {header && (
            <Modal.Title style={{ textAlign: "center", width: "100%" }}>
              {header}
            </Modal.Title>
          )}
        </Modal.Header>
        {body && <Modal.Body>{body}</Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSection;
