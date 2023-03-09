
import React, { createContext, useState, useEffect } from 'react';
import Auth from '@utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
    const [profileData, setProfileData] = useState(Auth.getProfile().data);

    const updateAuth = (state) => {
        setLoggedIn(state);
    };

    const updateProfileData = (data) => {
        setProfileData(data);
    }

    return (
        <AuthContext.Provider value={{ loggedIn, updateAuth, profileData, updateProfileData }}>
            {children}
        </AuthContext.Provider>
    );
};