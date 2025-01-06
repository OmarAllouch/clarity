import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import TodoPage from "./pages/TodoPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/todos" element={<TodoPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
