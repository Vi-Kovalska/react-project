import React from 'react'
import s from './Filter.module.css'
const Filter = ({value, onFilter}) => {
  return (
      <label> Search by name
          <input type="text" value={value} onChange={(e) => onFilter(e.target.value)} />
    </label>
  )
}

export default Filter