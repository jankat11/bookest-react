import { ImBooks } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";
import CheckBoxes from "./Checkboxes";
import { Col, Button, Spinner } from "react-bootstrap";

const ShiftButtons = ({handleCheckBoxes, addToBookShelf, removeButton, isRemoving, handleRemove, state}) => {
  return (
    <Col className="col-12 p-0">
    <CheckBoxes handleCheckBoxes={handleCheckBoxes} state={state} />
    <Col className="col-12 mt-3">
      <Button
        type="button"
        className="rounded-0 btn-info me-3 detail-button"
        onClick={addToBookShelf}
      >
        <ImBooks className="mb-1" /> Add To Bookshelf
      </Button>
      {removeButton && (
        <Button
          onClick={handleRemove}
          className="me-3 mt-3 mt-sm-0 btn-danger rounded-0 detail-button"
        >
          {!isRemoving ? (
            <>
              <CgPlayListRemove
                style={{
                  scale: "1.5",
                  position: "relative",
                  top: "2px",
                }}
                className="mb-1"
              />
              <span>Remove From Bookshelf</span>{" "}
            </>
          ) : (
            <Spinner size="sm" animation="grow" />
          )}
        </Button>
      )}
    </Col>
  </Col>
  )
}
export default ShiftButtons