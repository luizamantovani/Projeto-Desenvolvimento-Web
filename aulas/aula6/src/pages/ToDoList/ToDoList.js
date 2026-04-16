import React, { useState } from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="todo-list">
      <h1 className="todo-title">ToDo List</h1>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item 
              ${todo.completed ? 'completed' : ''} 
              ${editId === todo.id ? 'editing' : ''}`
            }
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            {editId === todo.id ? (
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span
                className="task-text"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            )}

            {editId === todo.id ? (
              <button className="save-btn" onClick={() => saveEdit(todo.id)}>
                Save
              </button>
            ) : (
              <button onClick={() => startEdit(todo)}>
                Edit
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;