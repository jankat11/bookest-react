import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchBook, fetchResult} from "./bookDetailsThunk"

export const getBook = createAsyncThunk("bookSlice/getBook", fetchBook);
export const getResult = createAsyncThunk("bookSlice/getResult", fetchResult);

const initialState = {
  book: {},
  isLoading: false,
  isError: false, 
  message: "",
  selfLink: ""
};
 
const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setBookEmpty (state) {
      state.book = {}
    },
    getSelfLink (state, action) {
      state.selfLink = action.payload
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
      })
      .addCase(getResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResult.fulfilled, (state, { payload }) => {
        state.book = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getResult.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions
