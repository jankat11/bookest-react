import {
  getResults,
  bookGenreActions,
} from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoadingBar from "./UI/LoadingBar";

const SearchForm = () => {
  const {
    isResultsLoading,
    isSearchActive,
    searchWords,
    searchPage,
    isFromResults,
  } = useSelector((store) => store.books);
  const { changeSearchActiveStatus, setSearchWords, resetPage } =
    bookGenreActions;
  const [words, setWords] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (words.trim().length !== 0) {
      dispatch(resetPage());
      dispatch(setSearchWords(words));
      if (!isSearchActive) {
        dispatch(changeSearchActiveStatus());
      }
      dispatch(getResults({ words, searchPage }));
    }
  };

  const getMoreResult = () => {
    console.log("inside more page word and page is: ", words, searchPage);
    dispatch(getResults({ words, searchPage }));
  };

  const handleChange = (e) => {
    setWords(e.target.value);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getMoreResult();
      console.log("ok");
    }
    console.log(window.scrollY);
  };

  useEffect(() => {
    if (isSearchActive) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => removeEventListener("scroll", handleScroll);
  }, [words, searchPage]);

  useEffect(() => {
    setWords(searchWords);
  }, []);

  useEffect(() => {
    if (!isSearchActive) {
      setWords("");
    }
  }, [isSearchActive]);

  return (
    <form
      onSubmit={handleSubmit}
      className="input-group shadow-sm rounded-0 my-3"
    >
      <input
        type="text"
        value={words}
        onChange={handleChange}
        className="form-control rounded-0 search-input"
        placeholder="Search a book or author"
        aria-label="Search a book or author"
        aria-describedby="button-addon2"
      />
      <button
        className="btn btn-info rounded-0 px-0 search-button"
        type="submit"
        id="button-addon2"
      >
        {!isResultsLoading ? "Search" : <LoadingBar />}
      </button>
    </form>
  );
};
export default SearchForm;
