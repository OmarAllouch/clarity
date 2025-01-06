import React from "react";
import TodoList from "../components/TodoList";
import TodoCreate from "../components/TodoCreate";

const TodoPage: React.FC = () => {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Create a new todo</h2>
      <TodoCreate />
      <hr className="my-4" />
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <TodoList />
    </div>
  );
};

export default TodoPage;
