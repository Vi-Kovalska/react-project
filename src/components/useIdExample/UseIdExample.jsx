// хук useId використовують:
// -якщо інпут вкладений не у лейбл - щоб пов*язати лейбл з інпутом(коли нажимаємо на лейбл - курсор стає в інпут)
// -тільки у формі, та якщо їх багато на сторінці
 
import React, { useState } from 'react'
import CustomInput from './customInput'

const UseIdExample = () => {
    const [inputsCounter, setInputsCounter] = useState(1)
    return (
        <>
        <h2>We dynamically add inputs with the id from HOC useId</h2>
            <button onClick={() => setInputsCounter(prev=> prev+1)}>+1</button>
            <button onClick={()=> setInputsCounter(prev=> prev-1)}>-1</button>
            {(inputsCounter > 1) && <button onClick={()=> setInputsCounter(1)}>Reset</button>}
            {/* викор конструктор Array(к-ть елементів у масиві що створиться) .fill(чим заповнити елемент)*/}
            {Array(inputsCounter).fill('').map((_, ind) => <CustomInput key={ind}/>)}
        </>
  )
}

export default UseIdExample