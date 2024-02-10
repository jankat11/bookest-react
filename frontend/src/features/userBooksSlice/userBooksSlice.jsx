import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddBook, fetchBooks, fetchRemoveBook } from "./userBooksThunk";

export const getBooks = createAsyncThunk("userSlice/getBooks", fetchBooks);
export const addBook = createAsyncThunk("userSlice/addBook", fetchAddBook);
export const removeBook = createAsyncThunk(
  "userSlice/removeBook",
  fetchRemoveBook
);

const initialState = {
  isBooksLoading: false,
  isLoading: false,
  isBookError: false,
  userBooks: null,
  user: null,
  isBookAdding: false,
  removeMessage: "",
};

const userBooksSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    setEmptyUserBooks(state) {
      state.userBooks = null;
    },
    setEmptyRemoveMessage(state) {
      state.removeMessage = "";
    },
    putNewNotedBook(state, action) {
      state.userBooks.noted_books.push(action.payload);
    },
    deleteNotedBook(state, action) {
      state.userBooks.noted_books = state.userBooks.noted_books.filter(
        (book) => {
          return book.id !== action.payload;
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isBooksLoading = true;
        state.isBookError = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isBooksLoading = false;
        state.userBooks = action.payload.mainShelf;
        state.userBooks.noted_books = [
          ...new Set(action.payload.noted_books.map(JSON.stringify)),
        ].map(JSON.parse);
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isBookError = true;
        state.isBooksLoading = false;
      })
      .addCase(addBook.pending, (state) => {
        state.isBookAdding = true;
        state.isBookError = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isBookAdding = false;
        state.userBooks.will_be_read = action.payload.will_be_read;
        state.userBooks.has_been_read = action.payload.has_been_read;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isBookAdding = false;
        state.isBookError = true;
        state.removeMessage = action.payload.detail;
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
        state.userBooks.will_be_read = will_be_read;
        state.userBooks.has_been_read = has_been_read;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.isRemoving = false;
        state.isBookError = true;
      });
  },
});

export default userBooksSlice.reducer;
export const userBooksActions = userBooksSlice.actions;
