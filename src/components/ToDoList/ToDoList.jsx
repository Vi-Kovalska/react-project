import React from 'react'
import s from './ToDoList.module.css'
import ToDoItem from './ToDoItem'
import { useState } from 'react'

const ToDoList = ({todosData}) => {
    const [todos, setTodos] = useState(todosData);
    const [newTask, setNewTask] = useState('');

    const handleDelete = id => {
        console.log(id);
        const newData = todos.filter(item => item.id !== id);
        console.log(newData);
        setTodos(newData);
    }

    const handleAdd = () => {
        const newObj = {
            id: crypto.randomUUID(),
            task: newTask,
        }
        setTodos(prev => [...prev, newObj]);
        setNewTask('');
    }

  return (
      <div className={s.wrapperToDo}>
          <h2>The ToDo list</h2>
          <div>
                <input value={newTask} type="text"  onChange={ ev => setNewTask(ev.target.value)}/>
              <button onClick={handleAdd}>ADD</button>
          </div>
          <ul>
              {todos.map(item => <ToDoItem key={item.id} {...item} handleDelete={handleDelete} />)}
          </ul>
    </div>
  )
}

export default ToDoList