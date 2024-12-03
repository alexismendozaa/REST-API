const express = require('express');
const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Base de datos simulada
let tasks = [
  { id: 1, description: 'Estudiar Node.js', completed: false },
  { id: 2, description: 'Hacer ejercicio', completed: true }
];

// Ruta GET para obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta POST para crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    description,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta PUT para actualizar el estado de una tarea
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Tarea no encontrada');

  task.completed = req.body.completed;
  res.json(task);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
