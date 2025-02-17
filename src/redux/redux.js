import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { todoSlice } from "./tasksSlice";

export const store = configureStore({
  reducer: { todoo: todoSlice.reducer },
});
