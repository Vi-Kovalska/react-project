import React, { Children } from 'react'
import s from './Modal.module.css'
import { useEffect } from 'react'
const Modal = ({ children, closeModal, title }) => {
    
    const handleBackdrop = (e) => {
//додаємо перевірку щоб вікно закривалось якщо клікнули на обгортку але буде бабл ефект (всплиття) і вікно закриється навіть якщо клікнути по самому полю вікна, для цього використовуємо карренттаргет(те на що навіщали слухача) і таргет(те по чому клікнули)
        if (e.target === e.currentTarget) {
          closeModal();
      }   
    }

// крайній випадок оли викор addEventListener  
    useEffect(() => {
        const handleKeyDown = (e) => {
            console.log(e.key);
            if (e.key === 'Escape') {
                closeModal();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        // обов*язково видаляємо обробник після закриття модалки щоб він не працював на сторінці і не вичерпував пам*ять
        return () => {
            console.log('Мене закрили');
            document.removeEventListener('keydown', handleKeyDown)
        }
}, [closeModal])
    
  return (
      <div onClick={handleBackdrop} className={s.backdrop}>
          <div className={s.modal}>
          <div className={s.content}>
              <div className={s.wrapperTitle}>
              <h1 className={s.title}>{title}</h1>
              <hr className={s.hr} />
               </div>
              <button onClick={closeModal} className={s.closeBtn}>x</button>
              {children}
          </div>
          <div className={s.answerWrapp}>
          <textarea name="modalTextarea" className={s.modalTextarea}></textarea>
              <button className={s.sendBtn}>send</button>
              </div>
              </div>
      </div>
  )
}

export default Modal