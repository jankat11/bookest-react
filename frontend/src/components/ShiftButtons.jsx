import { ImBooks } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";
import { Col, Button, Spinner } from "react-bootstrap";
import Checkboxes from "./SelectShelf";

const ShiftButtons = ({
  handleCheckBoxes,
  addToBookShelf,
  removeButton,
  isRemoving,
  handleRemove,
  state,
}) => {
  return (
    <Col lg={7} className="col-12 p-0">
      <Checkboxes handleCheckBoxes={handleCheckBoxes} state={state} />
      <Col className="d-flex justify-content-start align-items-center flex-wrap">
        <Button
          type="button"
          className="mt-3 me-sm-3 rounded-0 btn-info detail-button"
          onClick={addToBookShelf}
        >
          <ImBooks className="mb-1" /> Add To Bookshelf
        </Button>
        {removeButton && (
          <Button
            onClick={handleRemove}
            className="mt-3  btn-danger rounded-0 detail-button"
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
  );
};
export default ShiftButtons;
