import React from "react";
import { useState } from "react";
import "./Todo.css";

const Todo = ({ todo, toggleComplete, deleteTask, editTask}) => {

  const [editText, setEditText] = useState(todo.text)
  
  return (
    <div className="task">
      <div className="check">
        <input
          type="checkbox"
          name="taskCompleted"
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo.id)}
        />
      </div>
      <textarea type="text" value={editText} onChange={ (e)=> {editTask(e, todo.id, setEditText)} } className={`task-text ${todo.isCompleted ? "line-through" : ""}`} />

      <div className="task-btn">
        <button className="del-btn" onClick={() => deleteTask(todo.id)}>
          <img src="/delete.svg" alt="delete task"/> <p id="del">Delete</p>
        </button>
      </div>
    </div>
  );
};

export default Todo;
