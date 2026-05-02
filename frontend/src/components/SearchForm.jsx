import {
  getResults,
  bookGenreActions,
} from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoadingBar from "./UI/LoadingBar";
import { IoSearchOutline } from "react-icons/io5";

const getFirstPageRequestKey = (words) => `${words.trim().toLowerCase()}::1`;

const SearchForm = () => {
  const { isSearchActive, searchWords, activeSearchRequest } = useSelector(
    (store) => store.books
  );
  const { startSearch } = bookGenreActions;
  const [words, setWords] = useState("");
  const dispatch = useDispatch();
  const trimmedWords = words.trim();
  const isSubmitting =
    trimmedWords.length > 0 &&
    activeSearchRequest === getFirstPageRequestKey(trimmedWords);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trimmedWords || isSubmitting) {
      return;
    }

    dispatch(startSearch(trimmedWords));
    dispatch(getResults({ words: trimmedWords, searchPage: 1 }));
  };

  const handleChange = (e) => {
    setWords(e.target.value);
  };

  useEffect(() => {
    setWords(searchWords);
  }, [searchWords]);

  useEffect(() => {
    if (!isSearchActive) {
      setWords("");
    }
  }, [isSearchActive]);

  return (
    <form onSubmit={handleSubmit} className="search-form m-0" role="search">
      <div className="search-shell">
        <IoSearchOutline className="search-leading-icon" aria-hidden="true" />
        <input
          type="text"
          value={words}
          onChange={handleChange}
          className="form-control search-input"
          placeholder="Search a book or author"
          aria-label="Search a book or author"
        />
        <button
          className="btn btn-info px-0 search-button"
          type="submit"
          disabled={!trimmedWords || isSubmitting}
        >
          {!isSubmitting ? "Search" : <LoadingBar />}
        </button>
      </div>
    </form>
  );
};
export default SearchForm;
