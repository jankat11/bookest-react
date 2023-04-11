import { getResults } from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingBar from "./UI/LoadingBar";

const SearchForm = () => {
  const {isResultsLoading} = useSelector(store => store.books)
  const [words, setWords] = useState("") 
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
   e.preventDefault()
   if (words.trim().length !== 0)
    dispatch(getResults(words))
  }
  
  const handleChange = (e) => {
    setWords(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="input-group rounded-0 my-3">
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
        {!isResultsLoading? "Search" : <LoadingBar />}
      </button>
    </form>
  );
};
export default SearchForm;
