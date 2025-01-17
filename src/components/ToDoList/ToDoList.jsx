import React from 'react'
import s from './ToDoList.module.css'
import ToDoItem from './ToDoItem'

const ToDoList = () => {

  return (
      <div>
          <div>
                <input type="text" />
              <button>ADD</button>
          </div>
          <ul>
            <ToDoItem />
          </ul>
    </div>
  )
}

export default ToDoList