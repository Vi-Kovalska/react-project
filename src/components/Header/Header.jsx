import React, { useContext } from 'react'
import {authContext} from '../Provider/AuthentProvider/AuthentProvider'
import s from './Header.module.css'
import { themeContext } from '../Provider/ThemeProvider/ThemeProvider';

const Header = ({children}) => {
    const { userName, logout } = useContext(authContext);
    const { theme, toggleTheme } = useContext(themeContext);

  return (
      <div className={s.headerContainer}>
          {children}
          <button onClick={toggleTheme}>{theme}</button>
          <h2 className={s.title}>Welcome, {userName}!</h2>
          <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Header