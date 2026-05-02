import { ImBooks } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";
import { Button } from "react-bootstrap";
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
    <div className="detail-actions">
      <Checkboxes handleCheckBoxes={handleCheckBoxes} state={state} />
      <div className="detail-action-buttons">
        <Button
          variant="positive"
          disabled={isBookAdding}
          type="button"
          className="py-2 d-flex justify-content-center detail-button"
          onClick={addToBookShelf}
        >
          {!isBookAdding ? (
            <>
              <ImBooks className="mt-1 me-1 position-relative add-icon " />{" "}
              <span>Add To Bookshelf</span>
            </>
          ) : (
            <LoadingBar />
          )}
        </Button>
        {removeButton && (
          <Button
            variant="danger-action"
            disabled={isRemoving}
            onClick={() => {
              handleRemove(true);
              openModal(true);
            }}
            className="d-flex py-2 justify-content-center detail-button"
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
      </div>
    </div>
  );
};
export default ShiftButtons;
