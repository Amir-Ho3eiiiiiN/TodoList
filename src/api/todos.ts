import { api } from "./axios";

export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data.todos;
};

export const updateTodo = async (id: number, completed: boolean) => {
  const response = await api.patch(`/todos/${id}`, { completed });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
