import React from 'react'
import s from './Counter.module.css'
import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const handlePlusClick = () => {
// замість такого перезапису значення змінної setCount(count +1) краще використовувати зміну через колбек ф-цію де агрумент завжди це попередній стан каунт - previusState
        setCount(prev => prev +1);
    }
    const handleResetClick = () => {
        //  якщо просто обнуляємо то початкове значення не важливе, можна просто вказати 0
         setCount(0);
    }
     const handleMinusClick = () => {
         setCount(prev => prev - 1);
    }
    return (
        <>
            <h2>The counter</h2>
            <div className={s.counterContainer}>
                <div>
                    <p>{count}</p>
                    <div className={s.wrapper}>
                        <button className='btn' onClick={handlePlusClick}>plus</button>
                        <button className='btn' onClick={handleResetClick}>reset</button>
                        <button className='btn' onClick={handleMinusClick}>minus</button>
                    </div>
                </div>
            </div>
            </>
  )
}

export default Counter