const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
});

class Task extends Model {}

Task.init({
  name: DataTypes.STRING,
  completed: DataTypes.BOOLEAN
}, { sequelize, modelName: 'task' });

app.get('/api/v1/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json({ tasks });
});

app.post('/api/v1/tasks', async (req, res) => {
  const task = await Task.create(req.body);
  res.json({ task });
});

app.put('/api/v1/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  await task.update(req.body);
  res.json({ task });
});

app.delete('/api/v1/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  await task.destroy();
  res.json({ task });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
