import { useState, useEffect } from 'react'
import './App.css'
import clsx from "clsx";
import Clock from './Clock/Clock'
import Counter from './Counter/Counter';
import ColorPicker from './ColorPicker/ColorPicker';
import ToDoList from './ToDoList/ToDoList';

import colors from '../colors.json';
import todosData from '../todo.json';
import Modal from './Modal/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
       <button onClick={openModal}>Open modal</button>
      {isOpen && <Modal closeModal={closeModal} title={'Hello. How are you?'} />}
      <Clock />
      <Counter />
      <ColorPicker array={colors} />
      <ToDoList todosData={todosData} />
    </>
  )
}

export default App
