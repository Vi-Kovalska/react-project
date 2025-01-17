import React from 'react'
import s from './ToDoList.module.css'

const ToDoItem = ({id, completed, todo}) => {
  return (
      <li key={id}>
          <input type="checkbox" />
          <span>{todo}</span>
          <button>DELETE</button>
    </li>
  )
}

export default ToDoItem