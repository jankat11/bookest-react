

const SearchForm = () => {
  return (
    <div class="input-group rounded-0 my-3" >
      <input
        type="text"
        class="form-control rounded-0 search-input"
        placeholder="Search a book or author"
        aria-label="Search a book or author"
        aria-describedby="button-addon2"
      />
      <button class="btn btn-primary rounded-0" type="button" id="button-addon2">
        Search
      </button>
    </div>
  );
};
export default SearchForm;
