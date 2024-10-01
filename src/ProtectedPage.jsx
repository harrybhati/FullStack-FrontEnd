import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedPage(){
    const auth=localStorage.getItem('user');
    return  auth ? <Outlet/>:<Navigate to='/login'></Navigate>
}

export default ProtectedPage;