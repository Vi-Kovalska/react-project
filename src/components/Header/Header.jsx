import React, { useContext } from 'react'
import {authContext} from '../Provider/AuthentProvider/AuthentProvider'
import s from './Header.module.css'

const Header = () => {
    const {userName} = useContext(authContext)
  return (
      <div className={s.headerContainer}>
          <h2>Welcome, {userName}!</h2>
    </div>
  )
}

export default Header