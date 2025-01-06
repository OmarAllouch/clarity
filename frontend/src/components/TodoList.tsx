import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { Todo } from "../types/todo.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import DeleteIcon from "../icons/DeleteIcon";

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["todos"],
    }),
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <ul className="space-y-2">
      {todos?.map((todo) => (
        <Disclosure key={todo.id}>
          {({ open }) => (
            <>
              <DisclosureButton
                className={`w-full flex justify-between items-center p-2 border rounded ${open ? "bg-gray-200" : "bg-gray-50"}`}
              >
                <span>{todo.title}</span>
                <button className="text-red-500 p-2 hover:bg-gray-200 rounded" onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(todo.id);
                }}>
                  <DeleteIcon />
                </button>
              </DisclosureButton>
              <Transition
                show={open}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DisclosurePanel className="p-2 text-gray-600 bg-gray-100 rounded">
                  <p>{todo.description || "No description available"}</p>
                  {todo.dueDate && (
                    <p className="text-gray-400 text-sm">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </DisclosurePanel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))
      }
    </ul >
  );
};

export default TodoList;
