# Clarity

Clarity is a lightweight dashboard application for managing todos, notes, and reminders. It provides:
- A web-based dashboard for an interactive experience.
- A CLI tool for quick and efficient task management.
- Notifications and reminders to keep you on track.

---

## Features

- **Web Interface**: Manage todos, notes, and reminders visually.
- **CLI Tool**: Perform CRUD operations on todos and notes via the command line.
- **Reminders**: Set reminders for todos and notes, with notifications delivered via email or CLI alerts.
- **Data Storage**: Lightweight storage using SQLite.

---

## Technologies Used

- **Frontend**: React with Vite for fast builds and development.
- **Backend**: Express.js (TypeScript) for API services.
- **Database**: SQLite for lightweight, file-based storage.
- **Scheduler**: Node.js with `node-schedule` for reminders.
- **Notifications**: Nodemailer for email alerts.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clarity.git
   cd clarity
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=sqlite://./database/clarity.db
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@example.com
   EMAIL_PASSWORD=your-email-password
   ```

4. Run the application:
   - **Frontend**:
     ```bash
     cd frontend
     yarn dev
     ```
   - **Backend**:
     ```bash
     cd backend
     yarn dev
     ```
   - **CLI**:
     Run commands directly from the `cli/` directory.

---

## Usage

### Web Interface
1. Start the backend and frontend servers.
2. Open your browser and navigate to `http://localhost:3000`.

### CLI
Run commands from the root directory:
```bash
node cli add-todo "Finish the Clarity app"
node cli list-todos
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
