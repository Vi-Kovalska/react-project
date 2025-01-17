import { useState } from 'react'
import './App.css'
import clsx from "clsx";
import Clock from './Clock/Clock'
import Counter from './Counter/Counter';
import ColorPicker from './ColorPicker/ColorPicker';
import ToDoList from './ToDoList/ToDoList';

import colors from '../colors.json';
import todosData from '../todo.json';

function App() {

  return (
    <>
      <Clock time={new Date()} />
      <Counter />
      <ColorPicker array={colors} />
      <ToDoList todosData={todosData} />
    </>
  )
}

export default App
