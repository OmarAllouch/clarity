import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createNote = async (content: string): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to create note");
};

const NotesCreate: React.FC = () => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setContent("");
    }
  });

  const addNote = async () => {
    if (!content.trim()) return;
    mutation.mutate(content.trim());
  };

  return (
    <div className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new note"
        className="w-full border border-gray-300 rounded-md shadow-sm mb-2 p-2"
      />
      <button
        onClick={addNote}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Note
      </button>
    </div>
  );
}

export default NotesCreate
