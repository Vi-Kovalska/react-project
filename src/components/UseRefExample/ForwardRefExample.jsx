import { useRef } from 'react'
import CustomInput from './CustomInput'
// ForwardRef щоб передати ref як пропс вкладеному компоненту
export const ForwardRefExample = () => {
    const inputRef = useRef();


    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
  return (
      <div>
          <h2>React ForwardRef example</h2>
          <CustomInput ref={ inputRef} />
          <button onClick={focusInput}>Focus the input component</button>
    </div>
  )
}
