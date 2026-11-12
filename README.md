# SPANDAN — AI-Powered Time Management System

SPANDAN is a productivity dashboard MVP designed to help users organize tasks, monitor progress, and receive simple productivity suggestions.

## Features

- Dashboard with task and completion summaries
- Add tasks with title, category, and priority
- Mark tasks as completed or delete them
- Search and filter tasks
- Progress visualization and weekly activity chart
- Rule-based productivity suggestions
- Responsive dashboard layout

## Technology Stack

### Frontend
- React
- Vite
- CSS
- Lucide React
- Recharts

### Backend
- Node.js
- Express
- CORS
- dotenv

## Project Structure

```text
SPANDAN-AI/
├── backend/
│   └── src/
│       └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/sadiyafirdose57-code/SPANDAN-AI.git
cd SPANDAN-AI
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend URL: http://localhost:5000

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, normally http://localhost:5173.

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/api/tasks` | Retrieve tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update task completion |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/insights` | Retrieve task insights |

## Current Implementation Notes

- The frontend stores tasks in browser localStorage, allowing them to persist across page refreshes in the same browser.
- The backend currently uses in-memory storage, which resets when the server restarts.
- The frontend and backend are not yet connected; frontend task operations currently use localStorage.
- Productivity suggestions are rule-based and do not use a live AI model.
- The weekly activity chart currently displays illustrative sample data.

## Future Enhancements

- Connect the frontend to the backend API
- Integrate MongoDB for persistent storage
- Add user authentication
- Implement AI-assisted task prioritization and scheduling
- Add calendar integration and reminders
- Expand productivity analytics

## Project

Developed as an academic project MVP.

Repository: https://github.com/sadiyafirdose57-code/SPANDAN-AI
