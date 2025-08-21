import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";
import type { Todo } from "../types";
import { deleteTodo, updateTodo } from "../../../api/todos";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo as removeTodo } from "../todosSlice";

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: () => updateTodo(todo.id, !todo.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggle = () => {
    toggleMutation.mutate(); // if api works
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteMutation.mutate(); // if api works
      dispatch(removeTodo(todo.id));
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`flex justify-between items-center p-2 border rounded shadow-sm 
        ${
          todo.completed
            ? "bg-orange-100 line-through text-gray-500"
            : "bg-white"
        } cursor-pointer select-none`}
    >
      <span className={`${todo.completed && "text-orange-700"} text-sm`}>
        {todo.todo}
      </span>
      <Button onClick={handleDelete} className="text-xs text-orange-800 ">
        Remove
      </Button>
    </div>
  );
}
