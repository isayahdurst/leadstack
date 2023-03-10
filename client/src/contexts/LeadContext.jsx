import React, { createContext, useState } from 'react';

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
    const [lead, setLead] = useState({});

    const updateLead = (state) => {
        console.log(`LeadContext.jsx: updateLead: state: ${state}`);
        setLead({ ...state });
    };

    return (
        <LeadContext.Provider value={{ lead, updateLead }}>
            {children}
        </LeadContext.Provider>
    );
};
