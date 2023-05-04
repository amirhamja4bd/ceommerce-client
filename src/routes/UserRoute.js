import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

const UserRoute = () => {

    const [auth, setAuth] = useAuth();

    const [ok, setOk] = useState();

    useEffect(()=>{
        const isUser = async ()=>{
            const {data} = await axios.get(`/is-user`);
            if(data.ok){
                setOk(true);

            }
            else{
                setOk(false);
            }
        };
        if(auth?.token) isUser();
    },[auth?.token]);

    return ok ? <Outlet/> : <Loading/>

};

export default UserRoute;