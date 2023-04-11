import { ImBooks } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";
import { Col, Button, Spinner } from "react-bootstrap";
import Checkboxes from "./SelectShelf";
import LoadingBar from "./UI/LoadingBar";

const ShiftButtons = ({
  handleCheckBoxes,
  addToBookShelf,
  removeButton,
  isRemoving,
  handleRemove,
  openModal,
  isBookAdding,
  state,
}) => {
  return (
    <Col className="col-12 mt-3">
      <Checkboxes handleCheckBoxes={handleCheckBoxes} state={state} />
      <Col className="d-flex justify-content-between align-items-center flex-wrap">
        <Button
          type="button"
          className="mt-3 me-md-3  d-flex justify-content-center rounded-0 btn-info detail-button"
          onClick={addToBookShelf}
        >
          {!isBookAdding ? (
            <>
              <ImBooks className="mt-1 me-1 position-relative add-icon" />{" "}
              <span>Add To Bookshelf</span>
            </>
          ) : (
            <LoadingBar />
          )}
        </Button>
        {removeButton && (
          <Button
            onClick={() => {
              handleRemove(true);
              openModal(true);
            }}
            className="mt-3 d-flex justify-content-center btn-primary rounded-0 detail-button"
          >
            {!isRemoving ? (
              <>
                <CgPlayListRemove
                  style={{
                    scale: "1.5",
                    position: "relative",
                    top: "2px",
                  }}
                  className="mb-1 mt-1 me-1"
                />
                <span>Remove From Bookshelf</span>{" "}
              </>
            ) : (
              <LoadingBar />
            )}
          </Button>
        )}
      </Col>
    </Col>
  );
};
export default ShiftButtons;
