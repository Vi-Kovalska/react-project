import React, { useId } from 'react'

const CustomInput = () => {
    const id = useId();
    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label htmlFor={id}>This label is separate from the input</label>
      <input id={id} type='text' placeholder='I am not inside the label'/>

      </form>
  )
}

export default CustomInput