import React, { useState, useEffect } from 'react'
import s from './Vote.module.css'

const Vote = () => {
    // const [votingData, setVotingData] = useState({ macOs: 0, windows: 0, linux: 0 });
const [votingData, setVotingData] = useState(JSON.parse(window.localStorage.getItem('votingData')) ?? { macOs: 0, windows: 0, linux: 0 })
    
useEffect(() => { window.localStorage.setItem('votingData', JSON.stringify(votingData)) }, [votingData])
    
    const handleChooseOption = (option) => {
        setVotingData(prev => ({
            ...prev,
    // генеруємо об*єкт на основі динамічного ключа (те що прилетить в опшн)
            [option]: prev[option] + 1,
    }) )
    }
     const handleReset = (option) => {
        setVotingData(prev => ({
            ...prev,
    // генеруємо об*єкт на основі динамічного ключа (те що прилетить в опшн)
            [option]: prev[option]=0,
    }) )
    }
// Object.keys(obj) – возвращает массив ключей.
// Object.values(obj) – возвращает массив значений.
// Object.entries(obj) – возвращает массив пар [ключ, значение].
    const optionsValuesAndKeys = Object.entries(votingData);
//                   ['macOs', 'windows', 'linux']
    const btnOptions = Object.keys(votingData); 
    const optionsValues = Object.values(votingData);
  return (
      <div>
          <h2 className={s.title}>The Vote</h2>
          <ul>
              {optionsValuesAndKeys.map(obj => <li key={obj[0]}>{`${obj[0]}: ${obj[1]}`}</li>)}         
          </ul>
          <ul>
              {btnOptions.map(option => <button key={option + crypto.randomUUID()} onClick={() => handleChooseOption(option)}>{option}</button>)}    
         {optionsValues.some(el => el > 0) && <button onClick={()=> setVotingData({ macOs: 0, windows: 0, linux: 0 })}>reset</button>}
          </ul>

    </div>
  )
}

export default Vote