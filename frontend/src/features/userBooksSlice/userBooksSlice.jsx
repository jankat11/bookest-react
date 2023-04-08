import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddBook, fetchBooks, fetchRemoveBook } from "./userBooksThunk";

export const getBooks = createAsyncThunk("userSlice/getBooks", fetchBooks);
export const addBook = createAsyncThunk("userSlice/addBook", fetchAddBook);
export const removeBook = createAsyncThunk(
  "userSlice/removeBook",
  fetchRemoveBook
);

const initialState = {
  isLoading: false,
  isBookError: false,
  userBooks: null,
  user: null,
  removeMessage: ""
};

const userBooksSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    setEmptyUserBooks(state) {
      state.userBooks = null;
    },
    setEmptyRemoveMessage(state) {
      state.removeMessage = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.isBookError = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBooks = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isBookError = true;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.isBookError = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBooks = action.payload;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isBookError = true;
        state.removeMessage = action.payload.detail
      })
      .addCase(removeBook.pending, (state) => {
        state.isRemoving = true;
        state.isBookError = false;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.isRemoving = false;
        state.isBookError = false;
        const will_be_read = state.userBooks["will_be_read"].filter(
          (book) => book.id !== action.payload
        );
        const has_been_read = state.userBooks["has_been_read"].filter(
          (book) => book.id !== action.payload
        );

        state.userBooks = { will_be_read, has_been_read };
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.isRemoving = false;
        state.isBookError = true;
      });
  },
});

export default userBooksSlice.reducer;
export const userBooksActions = userBooksSlice.actions;
