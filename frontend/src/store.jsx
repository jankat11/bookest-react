import { configureStore } from "@reduxjs/toolkit";
import bookGenreSlice from "./features/bookGenreSlice/bookGenreSlice";
import bookSlice from "./features/bookSlice/bookSlice";

export const store = configureStore({
  reducer : {
    book: bookSlice,
    books: bookGenreSlice
  }
})