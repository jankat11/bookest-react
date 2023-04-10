import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchBook, fetchResult, fetchAddNote, fetchGetNotes} from "./bookDetailsThunk"

export const getBook = createAsyncThunk("bookSlice/getBook", fetchBook);
export const getResult = createAsyncThunk("bookSlice/getResult", fetchResult);
export const addNote = createAsyncThunk("bookSlice/addNote", fetchAddNote);
export const getNotes = createAsyncThunk("bookSlice/getNotes", fetchGetNotes);

const initialState = {
  book: {},
  isLoading: false,
  isError: false, 
  message: "",
  selfLink: "",
  isErrorNote: false,
  isNoteLoading: false,
  bookNotes: null
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
      .addCase(addNote.pending, (state) => {
        state.isNoteLoading = true;
        state.isErrorNote = false;
      })
      .addCase(addNote.fulfilled, (state, { payload }) => {
        state.isNoteLoading = false;
        state.isErrorNote = false;
        const noteItem = {_id: payload._id, on_book: payload.googleId, content: payload.content }
        state.bookNotes.reviews.unshift(noteItem)
      })
      .addCase(addNote.rejected, (state, { payload }) => {
        state.isNoteLoading = false;
        state.isErrorNote = true;
      })
      .addCase(getNotes.pending, (state) => {
        state.isNoteLoading = true;
        state.isErrorNote = false;
      })
      .addCase(getNotes.fulfilled, (state, { payload }) => {
        state.isNoteLoading = false;
        state.isErrorNote = false;
        state.bookNotes = payload
      })
      .addCase(getNotes.rejected, (state, { payload }) => {
        state.isNoteLoading = false;
        state.isErrorNote = true;
      })
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions
