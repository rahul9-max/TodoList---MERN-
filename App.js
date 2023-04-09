
import React, { useState , useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (inputValue !== '') {
      if (editId !== null) {
        await axios.put(`http://localhost:8000/todos/${editId}`, {
          text: inputValue,
        });
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:8000/todos', {
          text: inputValue,
        });
        setTodos([...todos, response.data]);
      }
      setInputValue('');
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const updateTodo = (id, text) => {
    setEditId(id);
    setInputValue(text);
  };

  const deleteAll = async () => {
    await axios.delete('http://localhost:8000/todos');
    setTodos([]);
  };

const handleKey=(e)=>{
  if(e.key==="Enter"){
    addTodo()
  }
}
  return (
    <div className="app-container">
    <h1 className="app-title">Todo List</h1>
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter a new todo item..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={handleKey}
        className="input-field"
      />
      <button onClick={addTodo} className="add-button">{editId !== null ? 'Update' : 'Add'}</button>
    </div>
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id}>
          <span className="todo-text">{todo.text}</span>
          <div className="button-container">
            <button onClick={() => updateTodo(todo._id, todo.text)} className="edit-button">Edit</button>
            <button onClick={() => deleteTodo(todo._id)} className="delete-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
    {todos.length > 0 && <button onClick={deleteAll} className="delete-all-button">Delete All</button>}
  </div>
);
}

export default App;