import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {

    const [user, setUser] = useState([]);

    useEffect( () => {
        if (user){
            const fetchData = async () => {
                const response = await fetch("/api/profile/me");
                const json = await response.json();
                setUser(json);
            };
            fetchData();
        }
    }, [user]);

    return(
        <UserContext.Provider value={[ user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
    
};