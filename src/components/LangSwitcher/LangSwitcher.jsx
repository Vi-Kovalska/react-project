import React, {useId} from 'react'

const LangSwitcher = ({ value, onSelect }) => {
    const selectId = useId();
  return (
    <div>
      <h2>The Lang switcher</h2>
      <label htmlFor={selectId}>Choose language</label>
      <br/>
      <select
        id={selectId}
        value={value}
        onChange={(evt) => onSelect(evt.target.value)}
      >
        <option value="uk">Ukrainian</option>
        <option value="en">English</option>
        <option value="pl">Polish</option>
      </select>

    </div>
  )
}

export default LangSwitcher