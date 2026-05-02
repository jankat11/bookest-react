import { useEffect, useMemo, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { bookGenreActions } from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";

const GENRE_OPTIONS = [
  { value: "hardcover-nonfiction", label: "hardcover nonfiction" },
  { value: "hardcover-fiction", label: "hardcover fiction" },
  { value: "trade-fiction-paperback", label: "trade fiction paperback" },
  {
    value: "advice-how-to-and-miscellaneous",
    label: "advice how to and miscellaneous",
  },
  { value: "paperback-nonfiction", label: "paperback nonfiction" },
  { value: "young-adult-hardcover", label: "young adult hardcover" },
  {
    value: "childrens-middle-grade-hardcover",
    label: "children's",
  },
];

const SelectForm = ({ getBooksGenre, genre }) => {
  const { resetSearch } = bookGenreActions;
  const { isSearchActive } = useSelector((store) => store.books);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedGenre = useMemo(() => {
    if (isSearchActive) {
      return "";
    }
    return genre || "hardcover-fiction";
  }, [genre, isSearchActive]);

  const selectedOption = isSearchActive
    ? { value: "", label: "select a genre" }
    : GENRE_OPTIONS.find((option) => option.value === selectedGenre) ||
      GENRE_OPTIONS[1];

  const handleSelect = (value) => {
    setIsOpen(false);
    if (value === selectedGenre) {
      return;
    }

    dispatch(resetSearch());
    getBooksGenre(value);
  };

  useEffect(() => {
    const close = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const closeByEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <div className="genre-filter m-0" ref={dropdownRef}>
      <div className={`genre-picker ${isOpen ? "is-open" : ""}`}>
        <span className="bestseller" id="genre-picker-label">
          Bestseller:
        </span>
        <button
          type="button"
          className="genre-trigger"
          aria-labelledby="genre-picker-label"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="genre-trigger-label">{selectedOption.label}</span>
          <IoChevronDownOutline
            className={`genre-chevron ${isOpen ? "is-open" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <ul className="genre-dropdown-menu" role="listbox" aria-label="Bestseller categories">
          {GENRE_OPTIONS.map((option) => {
            const isSelected = option.value === selectedGenre;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`genre-dropdown-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {isSelected && <MdCheck size={19} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectForm;
