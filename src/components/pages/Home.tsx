import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@apollo/client";

// Import utils
import { GET_USER } from '../../utils/query';

// Import redux
import { login,  } from '../../redux/auth/auth.actions';
import { RootState } from "../../redux/root-reducer";

const Home: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

  const { loading, error, data } = useQuery(GET_USER, {errorPolicy: 'ignore'});

    return (
        <div>
            <p>Protected Home</p>
            <Link to="/logout">Logout</Link>
        </div>
    )
}

export default Home
