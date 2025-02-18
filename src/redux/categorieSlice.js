import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/categories";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    console.log("🟡 fetchCategories Lancé ...");
    const response = await axios.get(API_URL);
    console.log("✅ fetchCategories data:", response.data);
    return response.data;
  }
);

export const addCategories = createAsyncThunk(
  "categories/addCategories",
  async (categ) => {
    const response = await axios.post(API_URL, categ);
    return response.data;
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    selectedCategory: "Toutes",
    status: "idle",
    error: null,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.status = "failed";
        state.error = {
          name: action.error.name,
          message: action.error.message,
        };
      })
      .addCase(addCategories.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.status = "idle";
        state.categories.push(action.payload);
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      });
  },
});
