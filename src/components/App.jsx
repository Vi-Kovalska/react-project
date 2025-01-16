import { useState } from 'react'
import './App.css'
import clsx from "clsx";
import Clock from './Clock/Clock'
import Counter from './Counter/Counter';
function App() {

  return (
    <>
      <Clock time={new Date()} />
      <Counter/>
    </>
  )
}

export default App
