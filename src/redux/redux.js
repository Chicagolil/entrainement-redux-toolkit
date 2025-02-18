import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./tasksSlice";
import { categoriesSlice } from "./categorieSlice";

export const store = configureStore({
  reducer: { todoo: todoSlice.reducer, categories: categoriesSlice.reducer },
});
