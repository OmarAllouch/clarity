import React, { useState } from "react";
import { Note } from "../types/note.type";
import LoadingSpinner from "./LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "../icons/DeleteIcon";
import ReactMarkdown from "react-markdown";

const fetchNotes = async (): Promise<Note[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

const deleteNote = async (id: number): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}

const NotesList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["notes"],
    }),
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  }

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ul className="space-y-2">
      {notes?.map((note) => (
        <li key={note.id} className="p-2 border rounded bg-gray-50 w-full flex justify-between items-center" onClick={() => toggleExpand(note.id)}>
          <div
            className={`text-gray-800 ${expanded[note.id] ? "" : "line-clamp-3"}`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            <ReactMarkdown
              children={note.content}
              className="prose"
            />
          </div>
          <button className="text-red-500 p-2 hover:bg-gray-200 rounded" onClick={(e) => {
            e.stopPropagation();
            handleDelete(note.id);
          }}>
            <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
