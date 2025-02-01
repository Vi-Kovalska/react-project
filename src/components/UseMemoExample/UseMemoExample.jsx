// HOC useMemo викор для оптимізації, якщо якісь складні обчислення є або робота з сервером щоб кожен раз при ререндеру сторінки (якийсь із станів змінився) щоб обчислення не проводити заново а використати захешовані дані
import React, { useMemo, useState } from 'react'

const UseMemoExample = () => {
    const [count, setCount] = useState(0);
    const [colored, setColored] = useState(false);
    const [value, setValue] = useState('');

    const heavyComputerCalculation = numb => {
    let i = 0;
        while (i < 100000) {
            i++;
        return  numb * numb;
     }
    }
    const result = useMemo(() => heavyComputerCalculation(count), [count]);
    const style = { color: colored ? 'red' : 'green' };

    return (
        <div>
            <h2>useMemo HOC Example</h2>
            <p style={style}>Result: {result}</p>
            <input type="text" onChange={(e) => setValue(e.target.value)} /> 
            <p>You are wrote: {value}</p>
            <button onClick={()=> setCount(prev => prev + 1)}>Increase</button>
            <button onClick={()=> setColored(prev => !prev)}>Change color</button>
    </div>
  )
}

export default UseMemoExample