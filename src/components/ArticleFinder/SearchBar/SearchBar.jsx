import React, { useState } from 'react'
import s from './SearchBar.module.css'
const SearchBar = ({ func, updatePerPage}) => {
    const [value, setValue] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
      func(value);
      updatePerPage(e.target.elements.number.value);
    }
  return (
      <form onSubmit={onSubmit}>
      <input onChange={(e) => { setValue(e.target.value) }} type="text" value={value} />
       <input type="number" name='number' placeholder='How many articles to show?' className={s.input} />
      <button>Search</button>
    </form>
  )
}

export default SearchBar