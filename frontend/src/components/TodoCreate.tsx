import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TodoInput {
  title: string;
  description: string;
  dueDate: string;
}

const createTodo = async (newTodo: TodoInput): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error("Failed to create todo");
};

const TodoCreate: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState<TodoInput>({
    title: "",
    description: "",
    dueDate: "",
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
      });
    },
  });

  const addTodo = async () => {
    const { title, description, dueDate } = newTodo;
    if (!title.trim()) return;
    mutation.mutate({
      title: title.trim(),
      description: description.trim(),
      dueDate,
    });
  };

  return (
    <div className="mt-4 space-y-2">
      <input
        type="text"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        placeholder="Title"
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <textarea
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        placeholder="Description"
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <input
        type="date"
        value={newTodo.dueDate}
        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <button
        onClick={addTodo}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </div>
  );
}

export default TodoCreate;
