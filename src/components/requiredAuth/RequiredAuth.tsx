import React, { ReactElement } from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import { RootState } from "../../redux/root-reducer";
import { useSelector, useDispatch } from 'react-redux';
import { login,  } from '../../redux/auth/auth.actions';

type RequiredAuthProps = {
    children: ReactElement
}

const RequiredAuth = ({ children }: RequiredAuthProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();

    if(localStorage.getItem('token') === null && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children
}

export default RequiredAuth