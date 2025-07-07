import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
export interface AddUserPayload {
  username: string;
  password: string;
  confirm: string;
  role: "admin" | "user";
}
export interface UpdateUserPayload {
  username: string;
  role: "admin" | "employee";
}
export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  username: string;
  role: string;
}
export interface UserSummary {
  userId: number;
  total: number;
  completed: number;
  pending: number;
  list: any;
}
export interface LoginResponse {
  accessToken: string;
  user: User;
  expiresIn: number;
}
export class UpdateTodoDto {
  title?: string;
  completed?: boolean;
  descriptions?: string;
  priority?: "low" | "medium" | "high";
  urgency?: "normal" | "urgent";
  userId?: number;
  supervisorId?: number;
}
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
}
export interface Todo {
  id: number;
  descriptions: string;
  title: string;
  completed: boolean;
  userId: number;
  supervisorId: number;
  priority?: "low" | "medium" | "high";
  urgency?: "normal" | "urgent";
}
export interface AdminSummaryAllItem {
  userId: number;
  username: string;
  total: number;
  completed: number;
  pending: number;
}
export async function getTodos(token: string) {
  const { data } = await api.get<Todo[]>("/todo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function addTodo(
  token: string,
  payload: { title: string; descriptions: string }
): Promise<Todo> {
  const { data } = await api.post<Todo>("/todo", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

// core/api/api.ts
export async function updateTodo(
  token: string,
  id: number,
  payload: UpdateTodoDto
): Promise<Todo> {
  const { data } = await api.patch<Todo>(`/todo/update/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function deleteTodo(token: string, id: number) {
  await api.delete(`/todo/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export async function getUsers(token: string): Promise<User[]> {
  const { data } = await api.get<User[]>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export async function getUserSummary(token: string): Promise<{
  userId: number;
  total: number;
  completed: number;
  pending: number;
  list: Todo[];
}> {
  const { data } = await api.get("/todo/user-summary", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
export async function getAdminSummaryAll(
  token: string
): Promise<AdminSummaryAllItem[]> {
  const { data } = await api.get<AdminSummaryAllItem[]>(
    "/todo/admin/summary-all",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function updateTodoStatus(
  token: string,
  id: number,
  completed: boolean
): Promise<Todo> {
  const { data } = await api.patch<Todo>(
    `/todo/status/${id}`,
    { completed },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function addUser(
  token: string,
  payload: AddUserPayload
): Promise<User> {
  const { data } = await api.post<User>("/users", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
export async function updateUser(
  id: number,
  token: string,
  payload: UpdateUserPayload
): Promise<User> {
  const { data } = await api.patch<User>(`/users/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
export async function deleteUser(token: string, id: number) {
  await api.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default api;
