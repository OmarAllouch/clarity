import React from "react";
import NotesList from "../components/NotesList";
import NotesCreate from "../components/NotesCreate";

const NotesPage: React.FC = () => {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Create a new note</h2>
      <NotesCreate />
      <hr className="my-4" />
      <h2 className="text-2xl font-bold mb-4">Notes List</h2>
      <NotesList />
    </div>

  );
};

export default NotesPage;
