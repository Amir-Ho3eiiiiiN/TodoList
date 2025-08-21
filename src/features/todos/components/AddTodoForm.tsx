import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addTodo } from "../todosSlice";
import { todoSchema, type TodoInput } from "../schema";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import type { Todo } from "../types";

export function AddTodoForm() {
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = todoSchema.safeParse({ todo: todoText });
    if (!result.success) {
      setError(result.error.issues?.[0]?.message || "Validation failed");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      ...(result.data as TodoInput),
    };

    dispatch(addTodo(newTodo));
    setTodoText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-lg gap-2"
    >
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter a new task..."
          value={todoText}
          onChange={handleChange}
        />
        <Button
          className="text-sm text-white bg-orange-600 hover:text-slate-800 hover:bg-orange-500"
          type="submit"
        >
          Add
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
