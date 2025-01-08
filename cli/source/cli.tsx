#!/usr/bin/env node
import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput } from "ink";
import axios from "axios";

const API_BASE_URL = process.env['API_BASE_URL'] || "http://localhost:4000/todos";

interface Todo {
	id: number;
	title: string;
	status: string;
}

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isAdding, setIsAdding] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	// Fetch todos from the API
	const fetchTodos = async () => {
		try {
			const response = await axios.get(API_BASE_URL);
			setTodos(response.data);
		} catch (error) {
			console.error("Failed to fetch todos");
		}
	};

	// Add a new todo
	const addTodo = async (title: string) => {
		try {
			await axios.post(API_BASE_URL, { title, status: "pending" });
			setNewTodo("");
			setIsAdding(false);
			await fetchTodos(); // Refresh todos
		} catch (error) {
			console.error("Failed to add todo");
		}
	};

	// Delete a todo
	const deleteTodo = async (id: number) => {
		try {
			await axios.delete(`${API_BASE_URL}/${id}`);
			await fetchTodos(); // Refresh todos
		} catch (error) {
			console.error("Failed to delete todo");
		}
	};

	// Handle keypress events
	useInput((input, key) => {
		if (isAdding) {
			if (key.return) {
				if (newTodo.trim()) addTodo(newTodo);
			} else if (key.backspace || key.delete) {
				setNewTodo((prev) => prev.slice(0, -1));
			} else if (key.escape) {
				setNewTodo("");
				setIsAdding(false);
			} else {
				setNewTodo((prev) => prev + input);
			}
			return;
		}

		if (key.upArrow || input == "k") {
			setSelectedIndex((prev) => Math.max(0, prev - 1));
		} else if (key.downArrow || input == "j") {
			setSelectedIndex((prev) => Math.min(todos.length - 1, prev + 1));
		} else if (key.return) {
			if (todos[selectedIndex])
				deleteTodo(todos[selectedIndex].id);
		} else if (input === "a") {
			setIsAdding(true);
		} else if (input === "q") {
			process.exit(0);
		} else if (input === "r") {
			fetchTodos();
		}
	});

	// Fetch todos on mount
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<Box flexDirection="column" padding={1}>
			<Text bold underline>Clarity: Todo Manager</Text>
			<Box marginY={1}>
				<Text>
					{isAdding
						? "Type your new todo and press Enter. Press Backspace to edit."
						: "Use ↓/↑ or j/k to navigate, Enter to check (delete), 'a' to add, 'q' to quit."}
				</Text>
			</Box>
			<Box flexDirection="column" borderStyle="round" borderColor="blue">
				{isAdding ? (
					<Text>
						New Todo: <Text bold>{newTodo}</Text>
					</Text>
				) : todos.length > 0 ? (
					todos.map((todo, index) => (
						<Box key={todo.id}>
							<Text color={selectedIndex === index ? "white" : "cyan"}>
								{index + 1}. {todo.title} {todo.status === "completed" ? "✅" : ""}
							</Text>
						</Box>
					))
				) : (
					<Text>No todos found.</Text>
				)}
			</Box>
		</Box>
	);
};

// Render the app
render(<App />);
