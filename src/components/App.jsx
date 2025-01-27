import { useState, useEffect } from 'react'
import './App.css'
import clsx from "clsx";

import colors from '../colors.json';
import initialTasks from '../tasks.json';

import Container from './Container/Container';
import Clock from './Clock/Clock'
import Counter from './Counter/Counter';
import ColorPicker from './ColorPicker/ColorPicker';
import ToDoList from './ToDoList/ToDoList';
import Modal from './Modal/Modal';
import Vote from './Vote/Vote';
import Form from './FormFilterTaskList/Form/Form';
import Filter from './FormFilterTaskList/Filter/Filter';
import TaskList from './FormFilterTaskList/TaskList/TaskList';
import ControlledForm from './ControlledForm/ControlledForm';
import UseIdExample from './useIdExample/useIdExample';
import LangSwitcher from './LangSwitcher/LangSwitcher';
import ImprovedCounter from './ImprovedCounter/ImprovedCounter';

function App() {
  // Modal region
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // Form&&Filter&&Task region
  const [tasks, setTasks] = useState(() => { return JSON.parse(window.localStorage.getItem('tasksWithForm')) ?? initialTasks;});
  const [filter, setFilter] = useState('');

 useEffect(()=>{window.localStorage.setItem('tasksWithForm', JSON.stringify(tasks))}, [tasks])
  const onAdd = (newTask) => {
    setTasks((prevTasks) => {
return [...prevTasks, newTask]
    })
  }
  const onDelete = (id) => {
  console.log(id);
    setTasks((prevTask) => {
      return prevTask.filter(task => task.id !== id);
  })
  }
  // якщо фільтр буде пустий ("") то інклюдс завжди поверне тру тому відмалюється у список всі таски 
  const visibleTasks = tasks.filter(task => task.text.toLowerCase().includes(filter.toLocaleLowerCase()));
  // ControlledForm region
  // ф-ція для забирання данних з форми, передаємо її через пропс на компонент з якого забираєм дані
  const register = dataFromForm => {
    console.log(dataFromForm);
  }
  // LangSwicher region
const [lang, setLang] = useState("uk");
  return (
    <>
      <Container>
        <button onClick={openModal}>Open modal</button>
        {isOpen && <Modal closeModal={closeModal} title={'Hello. How are you?'} />}
      </Container>
      <Container><Clock /></Container>
      <Container><Counter /></Container>
      <Container><ColorPicker array={colors} /></Container>
      <Container> <ToDoList/></Container>
      <Container><Vote/></Container>
      <Container>
        <h2>Tasks list with filter</h2>
        <Form onAdd={onAdd} />
        <Filter value={filter} onFilter={setFilter} />
        <TaskList tasks={visibleTasks} onDelete={onDelete}/>
      </Container>
      <Container>
        <ControlledForm register={register} />
      </Container>
      <Container>
        <UseIdExample/>
      </Container>
      <Container>
        <LangSwitcher value={lang} onSelect={setLang}/>
      </Container>
      <Container>
        <ImprovedCounter lsKey={new Date()}/>
      </Container>
    </>
  )
}

export default App
