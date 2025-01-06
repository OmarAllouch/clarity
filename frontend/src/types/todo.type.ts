export interface Todo {
	id: number;
	title: string;
	description?: string;
	dueDate?: string; // ISO string format
	createdAt: string;
	updatedAt: string;
}

