import React, { ReactElement } from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import { RootState } from "../../redux/root-reducer";
import { useSelector } from 'react-redux';

type RequiredAuthProps = {
    children: ReactElement
}

const RequiredAuth = ({ children }: RequiredAuthProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children
}

export default RequiredAuth