import React from "react";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({user, redirectPath = "/", children}) => {

    if(!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;


}