import React from 'react'
import s from './Counter.module.css'
import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const handlePlusClick = () => {
        setCount(count+1);
    }
     const handleResetClick = () => {
         setCount(0);
    }
     const handleMinusClick = () => {
         setCount(count-1);
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