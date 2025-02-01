import { useState } from 'react'
import { useRef } from 'react'
import s from './UseRefExample.module.css'
import clsx from 'clsx'
// useRef викор для посилання на елемент - для кролу вниз, або для візуалізації (коли елемент в зоні вьюпорта тощо)
// щоб не викор document. у реакті викор хук useRef щоб звернутися до елемента (отримати на нього посилання) 
// можна взяти посиання на елемент ы скрити його додавши свый зы стилями (чекбок кастомізувати, кнопку 'choose file')
const UseRefExample = () => {
    const inputRef = useRef();
    const [isChecked, setIsChecked] = useState(false);
    const handleClick = () => {
        inputRef.current.click();
        setIsChecked(prev => !prev);
    }
    // додали самостійне натискання 
//     useEffect(() => {
//         setTimeout(() => handleClick(), 3000
//     )
// }, [])
  return (
      <div>
          <h2>custom checkbox with HOC useRef </h2>
          <div className={s.flexWrapper}>
          <div onClick={handleClick} className={s[clsx(isChecked ? 'customCheckbox' : 'checked')]}></div>
              <p>I agree all rules!</p>
        </div>
          <input ref={inputRef} type="checkbox" style={{visibility: 'hidden'}} />
    </div>
  )
}

export default UseRefExample