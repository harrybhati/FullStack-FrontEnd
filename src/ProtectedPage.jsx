// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// function ProtectedPage(){
//     const auth=localStorage.getItem('user');
//     return  auth ? <Outlet/>:<Navigate to='/login'></Navigate>
// }

// export default ProtectedPage;



import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedPage({ allowedRoles }) {
    const auth = localStorage.getItem('user');

    if (!auth) {
       
        return <Navigate to='/login' />;
    }

    const user = JSON.parse(auth);
    const userRole = user.role;

   
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to='/unauthorized' />;
    }

   
    return <Outlet />;
}

export default ProtectedPage;
