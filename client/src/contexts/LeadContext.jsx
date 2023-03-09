import React, { createContext, useState } from 'react';
import Auth from '@utils/auth';

export const AuthContext = createContext();

export const LeadProvider = ({ children }) => {
    const [lead, setLead] = useState(null);

    const updateLead = (state) => {
        setLead(lead);
    };

    return (
        <AuthContext.Provider value={{ lead, setLead }}>
            {children}
        </AuthContext.Provider>
    );
};
