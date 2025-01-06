import express from "express";
import todoRoutes from "./routes/todo";
import noteRoutes from "./routes/note";
import reminderRoutes from "./routes/reminder";
import prisma from "./prisma";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);
app.use("/notes", noteRoutes);
app.use("/reminders", reminderRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
	try {
		await prisma.$connect();
		console.log(`Server is running on http://localhost:${PORT}`);
	} catch (err) {
		console.error("Error connecting to the database:", err);
		process.exit(1);
	}
});
