import express from "express";
import prisma from "../prisma";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
	const todos = await prisma.note.findMany();
	res.json(todos);
});

// Create a new todo
router.post("/", async (req, res) => {
	const { content } = req.body;
	const newTodo = await prisma.note.create({
		data: { content },
	});
	res.status(201).json(newTodo);
});

// Delete a todo
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await prisma.note.delete({ where: { id: Number(id) } });
	res.status(204).send();
});

export default router;

