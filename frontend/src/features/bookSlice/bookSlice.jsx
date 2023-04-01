import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {}

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  raducers: {},
  extraReducers: {}
})

export default bookSlice.reducer