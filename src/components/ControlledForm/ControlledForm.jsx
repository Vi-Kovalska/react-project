import React, { useState } from 'react'
import s from './ControlledForm.module.css'
const ControlledForm = () => {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '', course: '', about: '', level:'middle', isAcceptedRules: false});
    const handleSubmit = (e) => {
        e.preventDefault();
        // e.target.name.value.reset();
    }
    const handleChangeInput = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        //  деструктуруємо щоб менше писати       //
        const { name, value, type } = e.target;
        // перезаписуємо стан для чекбоксу
        if (type === 'checkbox') {
        return    setFormData(prev => ({...prev, [name]: !prev[name]}))
        }
        // розсипаємо, динамічно підставляємо [імя інпуту] та його значення. Для всіх інпуктів окрім ЧЕКБОКСА
        setFormData(prev => {
            return { ...prev, [name]: value };
        })
    }
    return (
      <>
            <h2>The controlled form</h2>
             <p>Join us!</p>
            <form onSubmit={handleSubmit} className={s.form}>
                <label className={s.label}>
                    <span>Name:</span>
                    <input type="text" name='userName' onChange={handleChangeInput} value={formData.userName}/>
                </label>
                <label className={s.label}>
                    <span>Email:</span>
                    <input type="email" name='email' onChange={handleChangeInput} value={formData.email}/>
                    </label>
                <label className={s.label}>
                    <span>Password:</span>
                    <input type="password" name='password' onChange={handleChangeInput} value={formData.password}/>
                </label>  
                <label className={s.label}>
        {/* у селект значення в яке запишеться вибрана опція в об*єкт стану це VALUE */}
                    <select name='course' value={formData.course} onChange={handleChangeInput}>
                        <option value="backend">Backend</option>
                        <option value="frontend">Frontend</option>
                        <option value="devops">DevOps</option>
                    </select>
                </label>
                <label className={s.label}>
                    <span>Tell us about your experience in IT</span>
                    <textarea name="about" value={formData.about} onChange={handleChangeInput} className={s.textarea}></textarea>
                </label>
    {/* радіокнопки */}
                <div>
                    <span>Choose your level:</span>
                    <label className={s.labelRadio}>
                        <span>Junior</span>
                        <input checked={'junior' === formData.level} type="radio" name='level' value='junior' onChange={handleChangeInput}/>
                    </label>
                    <label className={s.labelRadio}>
                        <span>Middle</span>
                        <input checked={'middle' === formData.level} type="radio" name='level' value='middle' onChange={handleChangeInput}/>
                    </label>
                    <label className={s.labelRadio}>
                        <span>Senior</span>
                        <input checked={'senior' === formData.level} type="radio" name='level' value='senior' onChange={handleChangeInput}/>
                    </label>
                </div>
                {/* чекбокси - значення встановлюємо не у value а у checked, у заг. ф-ції додаємо додю перевірку для чекбокса */}
                <label >
                   I accept all rules!
                    <input type="checkbox" name='isAcceptedRules' checked={formData.isAcceptedRules} onChange={handleChangeInput} />
                </label>
                <button type='submit'>Submit</button>
    </form>
      </>)
}

export default ControlledForm