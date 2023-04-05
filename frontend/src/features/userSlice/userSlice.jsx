import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./userThunk";

export const getUser = createAsyncThunk("userSlice/getUser", fetchUser);

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
  message: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emptyMessage (state) {
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = ""
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
        console.log(action.payload);
      })
  },
});

export default userSlice.reducer

export const userSliceActions = userSlice.actions
