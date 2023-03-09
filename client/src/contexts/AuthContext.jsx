
import React, { createContext, useState } from 'react';
import Auth from '@utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

    const updateAuth = (state) => {
        setLoggedIn(state);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};