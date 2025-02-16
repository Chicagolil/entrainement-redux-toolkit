import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/tasks"; // URL du json-server

// Récupérer toutes les tâches
export const fetchTasks = createAsyncThunk("todo/fetchTasks", async () => {
  console.log("🟡 fetchTasks lancé...");
  const response = await axios.get(API_URL);
  console.log("✅ fetchTasks data:", response.data);
  return response.data;
});

// Ajouter une tâche
export const addTask = createAsyncThunk(
  "todo/addTask",
  async ({ text, date }) => {
    console.log("🟡 addTask lancé avec :", { text, date });
    const response = await axios.post(API_URL, {
      text,
      date,
      done: false,
    });
    console.log("✅ addTask ajouté :", response.data);
    return response.data;
  }
);

// Basculer l'état d'une tâche
export const toggleTask = createAsyncThunk(
  "todo/toggleTask",
  async (id, { getState }) => {
    console.log("🟡 toggleTask lancé avec :", id);
    const task = getState().todoo.tasks.find((t) => t.id === id);
    const updatedTask = { ...task, done: !task.done };
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    console.log("✅ toggleTask finalisé :", response.data);
    return response.data;
  }
);

// Supprimer une tâche
export const deleteTask = createAsyncThunk("todo/deleteTask", async (id) => {
  console.log("🟡 deleteTask lancé avec :", id);
  await axios.delete(`${API_URL}/${id}`);
  console.log("✅ deleteTask finalisé :", id);
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: { tasks: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("📥 Redux action complète :", action);
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const store = configureStore({
  reducer: { todoo: todoSlice.reducer },
});
