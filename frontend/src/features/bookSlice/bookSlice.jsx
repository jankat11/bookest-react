import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchBook} from "./bookDetailsThunk"

export const getBook = createAsyncThunk("bookSlice/getBook", fetchBook);

const initialState = {
  book: {},
  isLoading: false,
  isError: false, 
  message: ""
};
 
const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setBookEmpty (state) {
      state.book = {}
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, { payload }) => {
        state.book = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getBook.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions
