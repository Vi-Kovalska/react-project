import React from 'react'
import s from './TaskList.module.css'
import Task from '../Task/Task'
const TaskList = ({tasks, onDelete}) => {
  return (
      <ul>
          {tasks.map(task => <li key={task.id}>
              <Task data={task} onDelete={onDelete}/>
          </li>)}
    </ul>
  )
}

export default TaskList