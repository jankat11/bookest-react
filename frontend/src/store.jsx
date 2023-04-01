import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "./features/bookSlice/bookSlice";

export const store = configureStore({
  reducer : {
    book: bookSlice,
  }
})