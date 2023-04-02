

const SearchForm = () => {
  return (
    <form class="input-group rounded-0 my-3" >
        <input
          type="text"
          class="form-control rounded-0 search-input"
          placeholder="Search a book or author"
          aria-label="Search a book or author"
          aria-describedby="button-addon2"
        />
        <button class="btn btn-primary rounded-0" type="submit" id="button-addon2">
          Search
        </button>
    </form>
  );
};
export default SearchForm;
