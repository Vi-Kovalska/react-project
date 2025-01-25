import React from 'react'
import s from './Task.module.css'
const Task = ({data:{id, text}, onDelete}) => {
  return (
      <div>
          <p>{text}</p>
          <button onClick={() => onDelete(id) }>DELETE</button>
    </div>
  )
}

export default Task