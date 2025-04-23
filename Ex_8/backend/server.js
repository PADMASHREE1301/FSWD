const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add CORS support
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Allow frontend to access backend

const FILE_PATH = "todos.json"; // Path to JSON file

// Ensure the file exists and is correctly formatted
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]), "utf8");
}

// Read todos from JSON file
const readTodosFromFile = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

// Write todos to JSON file safely
const writeTodosToFile = (todos) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(readTodosFromFile());
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const todos = readTodosFromFile();
  const newTodo = req.body;
  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
});

// Delete a todo by ID
app.delete("/api/todos/:id", (req, res) => {
  const todos = readTodosFromFile().filter(
    (todo) => todo.id !== parseInt(req.params.id)
  );
  writeTodosToFile(todos);
  res.status(200).json({ message: "Todo deleted" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});