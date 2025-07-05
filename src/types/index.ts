export interface User {
  id: string;
  nome: string;
  email: string;
}

export interface Task {
  id: string;
  descricao: string;
  concluida: boolean;
}

export interface CreateTaskPayload {
  descricao: string;
  concluida: boolean;
}

export interface UpdateTaskPayload {
  descricao: string;
  concluida: boolean;
}

export interface RegisterUserPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}