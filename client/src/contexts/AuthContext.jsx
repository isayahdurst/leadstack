import { createContext, useState } from 'react';
import Auth from '@utils/auth';

const AuthContext = createContext();

export function AuthProvider( { children }) {

    const [profile, setProfile] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

   

    const updateProfile = (authData) => {
        const { first_name, last_name, phone_number, email, password } = authData;
        
        setProfile(
            {...profile,
                first_name,
                last_name,
                phone_number,
                email,
                password
            }
        )
    }

    const updateLogin = (loggedIn) => {
        setLoggedIn(loggedIn);
    };

    const updateToken = (token) => {
        setToken(token);
    };

    const updateData = (data) => {
        setProfile(Auth.getProfile());
    }

    return(
        <AuthContext.Provider value={{profile, updateProfile, updateLogin, updateToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;