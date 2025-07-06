import axios from 'axios';
import { Task, CreateTaskPayload, UpdateTaskPayload, RegisterUserPayload } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  auth: {
    username: "juca@gmail.com",
    password: "123456"
  },
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptador para adicionar token de autenticação se necessário
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/api/tarefas');
    return response.data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await api.post('/api/tarefas', payload);
    return response.data;
  },

  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await api.put(`/api/tarefas/${id}`, payload);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/api/tarefas/${id}`);
  },
};

export const userService = {
  register: async (payload: RegisterUserPayload): Promise<User> => {
    const response = await api.post('/api/usuarios/registrar', payload);
    return response.data;
  },
};

export default api;