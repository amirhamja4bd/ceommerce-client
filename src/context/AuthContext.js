import axios from 'axios';
import React, { useContext, useEffect, useState ,createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth ] = useState({user: null, token: "" });
    const [token, setToken ] = useState("");

    //axios config
    axios.defaults.baseURL = process.env.REACT_APP_API;
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(()=>{
        const data = localStorage.getItem("auth");
        const getToken = localStorage.getItem("token");
        
        setToken(getToken);
        if(data){
            const parsed = JSON.parse(data);
            setAuth({ ...auth, user: parsed.user, token: parsed.token});
            
        }
    },[]);


    return (
        <AuthContext.Provider value={[auth, setAuth, token, setToken]}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };