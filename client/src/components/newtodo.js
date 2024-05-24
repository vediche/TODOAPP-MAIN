import React, { useState } from 'react';

const NewTodo = ({ todo, onDelete, onRestore}) => {

  const handleDelete = () => {
    onDelete(todo._id);
  };

  const handleRestore = () =>{
    onRestore(todo);
  }

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
    
     
        <p>{todo.title}</p>
        <>
          <button onClick={handleRestore}>Restore</button>
          <button onClick={handleDelete}>Delete</button>
        </>
    </div>
  );
};

export default NewTodo;