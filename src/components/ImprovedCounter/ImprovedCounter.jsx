import React, { useEffect, useState } from 'react'

const ImprovedCounter = ({ lsKey, initialValue = 0, min = 0, max = 10, step = 1 }) => {
    const [value, setValue] = useState( JSON.parse(window.localStorage.getItem(lsKey)) ?? initialValue);

    useEffect(() => { window.localStorage.setItem(lsKey, JSON.stringify(value)) }, [value, lsKey]);

    const onIncrement = () => { 
        if (value > max) return;
       return setValue(prev => (prev + step >= max ? max : prev + step))
    }
    const onDecrement = () => {
        if (value < min) return;
       return setValue(prev => (prev - step <= min ? min : prev - step ))
    }
    
  return (
      <>
          <h2>The Improved counter</h2>
          <button onClick={onIncrement} disabled={value >= max}>Increment</button>   
          <div>{value}</div>
          <button onClick={onDecrement} disabled={value <= min}>Decrement</button>
    </>
  )
}

export default ImprovedCounter