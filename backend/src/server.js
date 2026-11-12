
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete project documentation",
    category: "Study",
    priority: "High",
    completed: false,
    date: new Date().toISOString().slice(0, 10),
  },
  {
    id: 2,
    title: "Practice JavaScript",
    category: "Learning",
    priority: "Medium",
    completed: false,
    date: new Date().toISOString().slice(0, 10),
  },
];

app.get("/", (req, res) => {
  res.json({ message: "SPANDAN API is running successfully!" });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, category, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = {
    id: Date.now(),
    title: title.trim(),
    category: category || "Personal",
    priority: priority || "Medium",
    completed: false,
    date: new Date().toISOString().slice(0, 10),
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = Boolean(req.body.completed);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const previousLength = tasks.length;
  tasks = tasks.filter((item) => item.id !== Number(req.params.id));

  if (tasks.length === previousLength) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

app.get("/api/insights", (req, res) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  res.json({
    totalTasks: total,
    completedTasks: completed,
    pendingTasks: total - completed,
    completionRate: total
      ? Math.round((completed / total) * 100)
      : 0,
    recommendation:
      total - completed > 0
        ? "Focus on completing your highest-priority pending task first."
        : "Excellent work! Plan your next productive day.",
  });
});

app.listen(PORT, () => {
  console.log(`SPANDAN API running at http://localhost:${PORT}`);
});
