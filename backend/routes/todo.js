const { Router } = require("express");
const fs = require("fs/promises");
const path = require("path");
const router = Router();

const filePath = path.resolve("data/todos.json");

async function getAllTodo() {
  const todos = await fs.readFile(filePath, "utf8");
  const allTodos = await JSON.parse(todos);
  return allTodos;
}

async function writeTodo(todos) {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}


router.post("/", async (req, res) => {
  const todos = await getAllTodo();
  const { title, description, completed } = req.body;

  if (!title) {
    res.status(404).send("Title are required");
  }

  // const newId = todos.length > 0 ? Math.max(...todos.map((t) => parseInt(t.id))) + 1 : 1;
  const newId = todos.length + 1;

  const newTodo = {
    id: newId,
    title,
    description,
    completed: completed ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  await writeTodo(todos);
  res.status(201).json(newTodo);
});

router.get("/", async (req, res) => {
  const allTodos = await getAllTodo();
  res.status(200).json(allTodos);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const todos = await getAllTodo();
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    res.status(404).send("Todo not found");
  }
  res.status(200).json(todo);// returns one todo
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const todos = await getAllTodo();
  // const todoIndex = todos.findIndex(todos, parseInt(id));
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
  }
  const { title, description, completed } = req.body;
  const updatedTodo = {
    id: todos[todoIndex].id,
    title,
    description,
    completed: completed ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos[todoIndex] = updatedTodo;
  await writeTodo(todos);
  // res.status(200).json(todos);// returns all todo
  res.status(200).json(todos[todoIndex]);// returns only the update todo
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const todos = await getAllTodo();
  // const todoIndex = todos.findIndex(todos, parseInt(id));
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  console.log(todoIndex)
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
  }
  // todos = todos.removeAtIndex(todos, todoIndex);
  todos.splice(todoIndex, 1)
  await writeTodo(todos);
  res.status(200).json({ message: `Todo ${todoIndex} deleted successfully` });
  // const todo = todos.filter(t => t.id !== parseInt(id))
  // await writeTodo(todos);
  // res.status(200).send(todo)
});

module.exports = router;
