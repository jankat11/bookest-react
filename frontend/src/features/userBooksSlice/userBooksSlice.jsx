import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "./userBooksThunk";

export const getBooks = createAsyncThunk("userSlice/getBooks", fetchBooks);

const initialState = {
  isLoading: false,
  isError: false,
  userBooks: [],
  user: null,
};

const userBooksSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export default userBooksSlice.reducer;
