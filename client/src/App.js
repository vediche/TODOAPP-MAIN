import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TodoList from './components/TodoLists';
import TodoForm from './components/TodoForm';
import NewTodoList from './components/newtodolist';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [accomplishedTasks, setAccomplishedTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
    fetchAccomplishedTasks();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5050/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccomplishedTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5050/accomplished');
      setAccomplishedTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async (title) => {
    try {
      const response = await axios.post('http://localhost:5050/todos', { title, completed: false });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:5050/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTodo = async (todo) => {
    try {
      // Add to accomplished collection
      await axios.post('http://localhost:5050/accomplished', { title: todo.title });
      // Delete from todos collection
      await axios.delete(`http://localhost:5050/todos/${todo._id}`);
      setTodos(todos.filter(t => t._id !== todo._id));
      fetchAccomplishedTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreTodo = async (todo) => {
    try {
      // Add to todos collection
      await axios.post('http://localhost:5050/todos', { title: todo.title , completed : false });
      // Delete from accomplished collection
      await axios.delete(`http://localhost:5050/accomplished/${todo._id}`);
      fetchTodos();
      fetchAccomplishedTasks();
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteAccomplished = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/accomplished/${id}`);
      setAccomplishedTasks(accomplishedTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <h2>Todo List</h2>
      <TodoList todos={todos} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} onComplete={handleCompleteTodo} />
      <h2>Accomplished Tasks</h2>
      <NewTodoList todos={accomplishedTasks} onDelete={handleDeleteAccomplished} onRestore={handleRestoreTodo}/>
    </div>
  );
};

export default App;
