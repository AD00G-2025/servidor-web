import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TaskState, Task, CreateTaskPayload, UpdateTaskPayload } from '@/types';
import { taskService } from '@/services/api';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await taskService.getTasks();
      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar tarefas');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (payload: CreateTaskPayload, { rejectWithValue }) => {
    try {
      const task = await taskService.createTask(payload);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar tarefa');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, payload }: { id: string; payload: UpdateTaskPayload }, { rejectWithValue }) => {
    try {
      const task = await taskService.updateTask(id, payload);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao atualizar tarefa');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao deletar tarefa');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;