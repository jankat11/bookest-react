import { Form } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getResults } from "../features/bookGenreSlice/bookGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SearchForm = () => {
  const {isResultsLoading} = useSelector(store => store.books)
  const [words, setWords] = useState() 
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
        className="btn btn-primary rounded-0 search-button"
        type="submit"
        id="button-addon2"
      >
        {!isResultsLoading? "Search" : <Spinner size="sm" animation="grow" />}
      </button>
    </form>
  );
};
export default SearchForm;
