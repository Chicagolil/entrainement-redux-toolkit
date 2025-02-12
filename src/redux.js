import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/tasks"; // URL du json-server

// Récupérer toutes les tâches
export const fetchTasks = createAsyncThunk("todo/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Ajouter une tâche
export const addTask = createAsyncThunk("todo/addTask", async (text) => {
  const response = await axios.post(API_URL, { text, done: false });
  return response.data;
});

// Basculer l'état d'une tâche
export const toggleTask = createAsyncThunk(
  "todo/toggleTask",
  async (id, { getState }) => {
    const task = getState().todoo.tasks.find((t) => t.id === id);
    const updatedTask = { ...task, done: !task.done };

    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  }
);

// Supprimer une tâche
export const deleteTask = createAsyncThunk("todo/deleteTask", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: { tasks: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const store = configureStore({
  reducer: { todoo: todoSlice.reducer },
});
