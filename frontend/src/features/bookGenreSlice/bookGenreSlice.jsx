import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchBooks, { searchBooks } from "./bookGenreThunk";

export const getBooks = createAsyncThunk(
  "booksGenreSlice/getBooks",
  fetchBooks
);
export const getResults = createAsyncThunk(
  "booksGenreSlice/getResults",
  searchBooks
);

const initialState = {
  books: [],
  results: [],
  isLoading: true,
  isError: false,
  genre: "hardcover-nonfiction",
  message: "",
  isResultsLoading: false,
  isFromResults: false,
  isSearchActive: false,
  searchWords: "",
  searchPage: 1,
  isLoadingMoreResuls: false,
  finishSearch: false
};

const bookGenreSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    getGenre(state, action) {
      state.genre = action.payload;
    },
    changeSearchActiveStatus(state) {
      state.isSearchActive = !state.isSearchActive;
    },
    setSearchWords(state, action) {
      state.searchWords = action.payload;
    },
    nextPage(state) {
      state.searchPage = state.searchPage + 1;
    },
    resetPage(state) {
      state.searchPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.books = payload;
        state.isLoading = false;
        state.isError = false;
        state.isFromResults = false;
      })
      .addCase(getBooks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getResults.pending, (state) => {
        state.isResultsLoading = state.searchPage === 1 ? false : true;
        state.isLoading = state.searchPage === 1 ? true : false;
        state.isError = false;
      })
      .addCase(getResults.fulfilled, (state, { payload }) => {
        state.finishSearch = payload ? false : true
        const results = payload ? payload.map((book) => ({
          title: book.volumeInfo?.title,
          author: book.volumeInfo?.authors,
          book_image: book.volumeInfo?.imageLinks?.thumbnail,
          google_id: book.id,
          selfLink: book.selfLink,
        })) : []
        state.books =
          state.searchPage === 1 ? results : [...state.books, ...results];
        state.searchPage = state.searchPage + 1;
        state.isResultsLoading = false;
        state.isLoading = false;
        state.isError = false;
        state.isFromResults = true;
        console.log(Boolean(payload), state.finishSearch);
      })
      .addCase(getResults.rejected, (state, { payload }) => {
        state.isResultsLoading = false;
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export default bookGenreSlice.reducer;

export const bookGenreActions = bookGenreSlice.actions;
