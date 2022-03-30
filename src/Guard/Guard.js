import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../utilities/Cookie'

const useAuth = () => {
    const token = { token: getCookie('tokenuser') };
    return token && token.token;
}

export default function Guard() {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={'/'}/>
 
}
