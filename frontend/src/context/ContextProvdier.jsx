import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const Context = createContext();

const ContextProvdier = ({ children }) => {

    let [user, setUser] = useState("");
    let [token, setToken] = useState("");

    let getUser = async (token) => {
        if (token) {
            let response = axios.get("http://127.0.0.1:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let data = (await response).data;

            if (data.status === 401) {
                localStorage.removeItem("token");
                setUser("");
            } else {
                setUser(data);
            }
          

        }
    }

    useEffect(() => {
        let getToken = localStorage.getItem("token");
        getUser(getToken);

    }, [token])

    return (
        <Context.Provider value={{
            user,
            setUser,
            token,
            setToken
        }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvdier }