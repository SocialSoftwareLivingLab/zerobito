import React, {useState, useEffect, createContext} from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if(recoveredUser){
            setUser(JSON.parse(recoveredUser));
        }
    }, []);

    const login = (email, password) => {
        console.log('login auth', { email, password });

        const loggedUser =  {
            id: "123",
            email,
        };

        localStorage.setItem("user", JSON.stringify(loggedUser));

        if(password==="123"){
            setUser(loggedUser);
            navigate("/");
        }
    };

    const logout = () => {
        console.log("logout");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider 
            value={{ authenticated: !!user, user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}