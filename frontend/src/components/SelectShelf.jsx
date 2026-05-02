const Checkboxes = ({ state, handleCheckBoxes }) => {
  const handleShelfChange = (name) => {
    handleCheckBoxes({ target: { name } });
  };

  return (
    <div className="shelf-segmented-control" role="group" aria-label="Reading status">
      <button
        type="button"
        aria-pressed={state.willBeRead}
        className={`shelf-segment ${state.willBeRead ? "is-active" : ""}`}
        onClick={() => handleShelfChange("will_be_read")}
      >
        To read
      </button>
      <button
        type="button"
        aria-pressed={state.hasBeenRead}
        className={`shelf-segment ${state.hasBeenRead ? "is-active" : ""}`}
        onClick={() => handleShelfChange("has_been_read")}
      >
        Finished
      </button>
    </div>
  );
};
export default Checkboxes;
