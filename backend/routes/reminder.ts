import express from "express";
import prisma from "../prisma";

const router = express.Router();

// Get all reminders
router.get("/", async (req, res) => {
	const reminders = await prisma.reminder.findMany();
	res.json(reminders);
});

router.post("/", async (req, res) => {
	const { targetType, targetId, reminderTime } = req.body;
	const newReminder = await prisma.reminder.create({
		data: { targetType, targetId, reminderTime: new Date(reminderTime) },
	});
	res.status(201).json(newReminder);
});

export default router;

