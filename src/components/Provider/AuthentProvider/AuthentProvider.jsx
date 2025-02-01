import React, { createContext, useState } from 'react'

export const authContext = createContext();

export const AuthentProvider = ({children}) => {
    const [userName, setUserName] = useState('');
    // const savedDataUser = JSON.parse(window.localStorage.getItem('dataUser')) ?? '';
    const login = (user) => {
        // if (savedDataUser) {
            
        // }
        setUserName(user);
    }
    const logout = () => setUserName('');

    const userValue = {
        userName,
        login,
        logout
    }
    return <authContext.Provider value={userValue}>{children}</authContext.Provider>;
}
