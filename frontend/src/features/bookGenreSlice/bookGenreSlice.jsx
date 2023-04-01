import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "./bookGenreThunk";

export const getBooks = createAsyncThunk("booksGenreSlice/getBooks", fetchBooks);

const initialState = {
  books: [],
  isLoading: true,
  isError: false, 
  message: ""
};

const bookGenreSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks (state, action) {
      state.books = action.payload
    },
    loaded (state) {
      state.isLoading = false
    }
  },
/*   extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBooks.fulfilled, (state, {payload}) => {
        state.books = payload
        state.isLoading = false
        state.isError = false
      })
      .addCase(getBooks.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = "something went wrong:( try later..."
      });
  }, */
});

export default bookGenreSlice.reducer;

export const bookGenreActions = bookGenreSlice.actions
