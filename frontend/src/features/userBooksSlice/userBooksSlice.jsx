import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddBook, fetchBooks } from "./userBooksThunk";

export const getBooks = createAsyncThunk("userSlice/getBooks", fetchBooks);
export const addBook = createAsyncThunk("userSlice/addBook", fetchAddBook);

const initialState = {
  isLoading: false,
  isError: false,
  userBooks: null,
  user: null,
};

const userBooksSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    setEmptyUserBooks (state) {
      state.userBooks = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.userBooks = action.payload
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.userBooks = action.payload
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isError = true;
        console.log(action.payload);
      })
  },
});

export default userBooksSlice.reducer;
export const userBooksActions = userBooksSlice.actions