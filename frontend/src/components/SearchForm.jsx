import {
  getResults,
  bookGenreActions,
} from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoadingBar from "./UI/LoadingBar";

const SearchForm = () => {
  const { isLoading, isSearchActive, searchWords } = useSelector(
    (store) => store.books
  );
  const { changeSearchActiveStatus, setSearchWords, resetPage } =
    bookGenreActions;
  const [words, setWords] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedWords = words.trim();

    if (!trimmedWords || isLoading) {
      return;
    }

    dispatch(resetPage());
    dispatch(setSearchWords(trimmedWords));
    if (!isSearchActive) {
      dispatch(changeSearchActiveStatus());
    }
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
    <form onSubmit={handleSubmit} className="input-group mt-2 search-form">
      <input
        type="text"
        value={words}
        onChange={handleChange}
        className="form-control search-input"
        placeholder="Search a book or author"
        aria-label="Search a book or author"
        aria-describedby="button-addon2"
      />
      <button
        className="btn btn-info px-0 search-button"
        type="submit"
        id="button-addon2"
        disabled={isLoading || words.trim().length === 0}
      >
        {!isLoading ? "Search" : <LoadingBar />}
      </button>
    </form>
  );
};
export default SearchForm;
