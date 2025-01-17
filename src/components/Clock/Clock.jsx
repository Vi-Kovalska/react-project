import s from './Clock.module.css'
import clsx from "clsx";
import { useState, useEffect } from 'react';
// Завдання 1 із 3 :Полагодити зламаний годинник
// Цей компонент намагається встановити <h1>для класу CSS значення "night"протягом часу з опівночі до шостої години ранку та "day"в будь-який інший час. Однак це не працює. Чи можете ви виправити цей компонент?
// Ви можете виправити цей компонент, обчисливши classNameта включивши його у вихідні дані візуалізації:
export default function Clock() {
  const [time, setTime] = useState(new Date())
  
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;
  let classNames;
  
  if (hours >= 0 && hours <= 6) {
    classNames = 'night';
  } else {
    classNames = 'day';
  }

  useEffect(() => {
    const intID = setInterval(() => { setTime(new Date()) }, 1000);
    return () => clearInterval(intID);
  }, []);
  
  
    return (
        <>
      <h2>The clock</h2>
        <p className={s[clsx(classNames === 'night' ? 'night' : 'day')]}>{timeString}</p>
            </>
  );
}