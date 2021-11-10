import React from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiredAuth = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children
}

export default RequiredAuth