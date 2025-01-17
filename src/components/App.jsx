import { useState } from 'react'
import './App.css'
import clsx from "clsx";
import Clock from './Clock/Clock'
import Counter from './Counter/Counter';
import ColorPicker from './ColorPicker/ColorPicker';
import colors from '../colors.json'

function App() {

  return (
    <>
      <Clock time={new Date()} />
      <Counter />
      <ColorPicker array={colors}/>
    </>
  )
}

export default App
