import { useQuery } from "@tanstack/react-query";
import { TodoItem } from "./TodoItem";
import { getTodos } from "../../../api/todos";
import type { Todo } from "../types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setTodos, reorderTodos } from "../todosSlice";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTodos(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos.</p>;

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; 
    if (source.index === destination.index) return; 

    dispatch(reorderTodos({ from: source.index, to: destination.index }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-2"
          >
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem todo={todo} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
