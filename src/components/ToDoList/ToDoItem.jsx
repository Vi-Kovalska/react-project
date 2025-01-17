import React from 'react'
import s from './ToDoList.module.css'

const ToDoItem = ({id, completed, task, handleDelete}) => {
  return (
      <li key={id}>
          {/*  checked={completed === 'true' ? 'checked' : ""} */}
          <input type="checkbox" /> 
          <span>{task}</span>
          <button onClick={() => handleDelete(id)}>DELETE</button>
    </li>
  )
}

export default ToDoItem