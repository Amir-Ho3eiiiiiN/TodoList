import { Layout } from "../components/Layout";
import { AddTodoForm } from "../features/todos/components/AddTodoForm";
import { TodoList } from "../features/todos/components/TodoList";

export default function App() {
  return (
    <Layout>
      <AddTodoForm />
      <div className="w-full max-w-lg ">
        <TodoList />
      </div>
    </Layout>
  );
}
