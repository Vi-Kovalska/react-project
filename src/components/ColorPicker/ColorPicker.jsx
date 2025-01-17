import React from 'react'
import s from './ColorPicker.module.css'
import { useState } from 'react'

function ColorPicker({ array }) {
    const [currentColor, setCurrentColor] = useState('white');

    const handleChangeColor = (value) => {
    setCurrentColor(value)
}
    return (
        <section className={s.bgWrapper} style={{backgroundColor: currentColor}}>
            <div className={s.pallette}>
                <h2>Current color: {currentColor}</h2>
                <ul className={s.colorList}>
                    {/* передаємо обробник Хука через колбек щоб він відпрацьовува при натисканні а не при кожній ітераціїї під час рендеру */}
                    {/* також таким чином через колл передаємо в обробник параметр кольору */}
                    {array.map((item) => <li onClick={() => handleChangeColor(item.colorName)} key={item.id + item.colorName} className={s.itemColor}>{item.colorName}</li>)}
                </ul>
            </div>
        </section>
    )
}

export default ColorPicker