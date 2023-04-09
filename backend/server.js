const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./models/Store');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
const MONGODB_URI = 'mongodb://localhost:27017/Crux1';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,family: 4 })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  await todo.save();
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.text = req.body.text;
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.json(todo);
});

app.delete('/todos', async (req, res) => {
  await Todo.deleteMany();
  res.json({ message: 'All todos deleted' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
