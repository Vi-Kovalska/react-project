import React from 'react'
import s from './Form.module.css'
const Form = ({onAdd}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
          onAdd({
      id: Date.now(),
      text: e.target.elements.text.value,
    });
        e.target.reset();
    }
  return (
      <form onSubmit={handleSubmit}>
          <input type="text" name='text' />
          <button type='submit'>Add</button>
    </form>
  )
}

export default Form