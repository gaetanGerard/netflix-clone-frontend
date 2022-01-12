/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { gql, useQuery } from "@apollo/client";
// Import redux
import { login,  } from '../redux/auth/auth.actions';
import { RootState } from "../redux/root-reducer";
// Import Custom Components
import HomeWelcome from './homeWelcome/HomeWelcome';
import Auth from './pages/Auth';
import RequiredAuth from "./requiredAuth/RequiredAuth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
// Import Style
import '../styles/App.scss';


const App: FC = (): JSX.Element => {
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

  useEffect(() => {
    if(data && !user && localStorage.getItem('token')) dispatch(login(data.getUser));
  }, [dispatch, user, data])

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeWelcome />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/logout" element={<Auth />} />
        <Route path="/home" element={<RequiredAuth><Home /></RequiredAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
