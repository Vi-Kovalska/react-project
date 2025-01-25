import React from 'react'
import s from './ToDoList.module.css'
import ToDoItem from './ToDoItem'
import { useState, useEffect } from 'react'

const ToDoList = () => {
    //                                        перевіряємо щоб нет було null or undefined
    const [todos, setTodos] = useState(() => JSON.parse(window.localStorage.getItem('saved-task')) ?? []
        // const savedData = JSON.parse(window.localStorage.getItem('saved-task'));
        // if (savedData !== 0) {
        //     return savedData;
        // }
        // return [];
    );
    const [newTask, setNewTask] = useState('');

    useEffect(() => { window.localStorage.setItem('saved-task', JSON.stringify(todos)) }, [todos])
    
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