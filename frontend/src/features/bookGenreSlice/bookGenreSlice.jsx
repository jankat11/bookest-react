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
  genre: "hardcover-fiction",
  message: "",
  isResultsLoading: false,
  isFromResults: false
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.books = payload;
        state.isLoading = false;
        state.isError = false;
        state.isFromResults = false
      })
      .addCase(getBooks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getResults.pending, (state) => {
        state.isResultsLoading = true;
      })
      .addCase(getResults.fulfilled, (state, { payload }) => {
        const results = payload.map((book) => ({
          title: book.volumeInfo?.title,
          author: book.volumeInfo?.authors,
          book_image: book.volumeInfo?.imageLinks?.thumbnail,
          google_id: book.id,
          selfLink: book.selfLink
        }));
        state.books = results
        state.isLoading = false;
        state.isError = false;
        state.isFromResults = true
      })
      .addCase(getResults.rejected, (state, { payload }) => {
        state.isResultsLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export default bookGenreSlice.reducer;

export const bookGenreActions = bookGenreSlice.actions;
