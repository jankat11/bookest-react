import { configureStore } from "@reduxjs/toolkit";
import bookGenreSlice from "./features/bookGenreSlice/bookGenreSlice";
import bookSlice from "./features/bookSlice/bookSlice";
import userSlice from "./features/userSlice/userSlice";

export const store = configureStore({
  reducer : {
    book: bookSlice,
    books: bookGenreSlice,
    user: userSlice,
  }
})