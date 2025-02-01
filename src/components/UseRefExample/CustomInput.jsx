import { forwardRef } from 'react'

const CustomInput = forwardRef((props, ref) => {
    return <input ref={ref}type="text"{...props} />
})

// forwardRef перезатер ім*я компонента тому явно його вказуємо
CustomInput.displayName = 'CustomInput';

export default CustomInput