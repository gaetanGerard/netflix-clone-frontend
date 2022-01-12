import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { gql, useQuery } from "@apollo/client";
// Import redux
import { login,  } from '../../redux/auth/auth.actions';
import { RootState } from "../../redux/root-reducer";

const Home: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const GET_USER = gql`
    query Query {
      getUser {
        _id
        username
        email
        date_of_birth
        description
        firstname
        gender
        lastname
        profile_pic
        updated_at
        created_at
        rememberMe
        specialOffers
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER, {errorPolicy: 'ignore'});

    return (
        <div>
            <p>Protected Home</p>
            <Link to="/logout">Logout</Link>
        </div>
    )
}

export default Home
