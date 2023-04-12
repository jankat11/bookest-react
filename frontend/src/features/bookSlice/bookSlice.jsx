import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getNoteTimestamp} from "../../utils"

import {
  fetchBook,
  fetchResult,
  fetchAddNote,
  fetchGetNotes,
  fetchDeleteNote,
} from "./bookDetailsThunk";

export const getBook = createAsyncThunk("bookSlice/getBook", fetchBook);
export const getResult = createAsyncThunk("bookSlice/getResult", fetchResult);
export const addNote = createAsyncThunk("bookSlice/addNote", fetchAddNote);
export const getNotes = createAsyncThunk("bookSlice/getNotes", fetchGetNotes);
export const deleteNote = createAsyncThunk(
  "bookSlice/deleteNote",
  fetchDeleteNote
);

const initialState = {
  book: {},
  isLoading: false,
  isError: false,
  message: "",
  selfLink: "",
  isErrorNote: false,
  isNoteLoading: false,
  isNotesLoading: false,
  isNoteDeleteLoading: false,
  bookNotes: null,
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setBookEmpty(state) {
      state.book = {}
      state.bookNotes = null
    },
    getSelfLink(state, action) {
      state.selfLink = action.payload;
    },
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
        const noteItem = {
          _id: payload._id,
          on_book: payload.googleId,
          content: payload.content,
          time: getNoteTimestamp()
        };
        state.bookNotes.reviews.unshift(noteItem);
      })
      .addCase(addNote.rejected, (state, { payload }) => {
        state.isNoteLoading = false;
        state.isErrorNote = true;
      })
      .addCase(getNotes.pending, (state) => {
        state.isNotesLoading = true;
        state.isErrorNote = false;
      })
      .addCase(getNotes.fulfilled, (state, { payload }) => {
        state.isNotesLoading = false;
        state.isErrorNote = false;
        state.bookNotes = payload;
      })
      .addCase(getNotes.rejected, (state, { payload }) => {
        state.isNotesLoading = false;
        state.isErrorNote = true;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isNoteDeleteLoading = true;
        state.isNoteDeleteError = false;
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.isNoteDeleteLoading = false;
        state.isNoteDeleteError = false;
        state.bookNotes.reviews = state.bookNotes.reviews.filter((note) => {
          return note._id !== payload;
        });
      })
      .addCase(deleteNote.rejected, (state, { payload }) => {
        state.isNoteDeleteLoading = false;
        state.isNoteDeleteError = true;
      });
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions;
