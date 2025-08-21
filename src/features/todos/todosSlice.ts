import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "./types";

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [movedItem] = state.todos.splice(from, 1);
      state.todos.splice(to, 0, movedItem);
    },
  },
});

export const { setTodos, toggleTodo, deleteTodo, addTodo, reorderTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
