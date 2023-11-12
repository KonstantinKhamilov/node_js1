const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'task_manager'
});

app.get('/tasks', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tasks');
  res.send(rows);
});

app.post('/tasks', async (req, res) => {
  const { name, completed } = req.body;
  const [result] = await pool.query('INSERT INTO tasks (name, completed) VALUES (?, ?)', [name, completed]);
  res.send({ id: result.insertId, name, completed });
});

app.put('/tasks/:id', async (req, res) => {
  const { name, completed } = req.body;
  await pool.query('UPDATE tasks SET name = ?, completed = ? WHERE id = ?', [name, completed, req.params.id]);
  res.send({ id: req.params.id, name, completed });
});

app.delete('/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
  res.send({ id: req.params.id });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
