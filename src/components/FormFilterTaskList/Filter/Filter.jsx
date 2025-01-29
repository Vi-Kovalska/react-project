import React from 'react'
import s from './Filter.module.css'
const Filter = ({value, setFilter}) => {
  return (
      <label> Search by name
          <input type="text" value={value} onChange={(e) => setFilter(e.target.value)} />
    </label>
  )
}

export default Filter