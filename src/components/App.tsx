/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@apollo/client";

// Import utils
import { GET_USER } from '../utils/query';

// Import redux
import { login } from '../redux/auth/auth.actions';
import { selectProfile } from '../redux/profile/profile.action';
import { RootState } from "../redux/root-reducer";

// Import Custom Components
import HomeWelcome from './homeWelcome/HomeWelcome';
import Auth from './pages/Auth';
import RequiredAuth from "./requiredAuth/RequiredAuth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
import Profiles from "./pages/Profiles";
import ProfileAdd from "./profiles/ProfileAdd";
import ProfilesEdit from "./profiles/ProfilesEdit";
import ProfileEdit from "./profiles/ProfileEdit";
import Tvs from "./pages/Tvs";
import Movies from "./pages/Movies";
import MyList from './pages/MyList';
import SearchResult from './pages/SearchResult';

// Import Style
import '../styles/App.scss';


const App: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const p = useSelector((state: RootState) => state.profile.profile);

  const { loading, error, data } = useQuery(GET_USER, {errorPolicy: 'ignore'});

  useEffect(() => {
    if(data && !user && localStorage.getItem('token')) {
      dispatch(login(data.getUser));
      navigate(location.pathname);
    };
    const profile = JSON.parse(localStorage.getItem('profileSave') || '{}');

    if(Object.entries(profile).length > 0 && p === null) {
      dispatch(selectProfile(profile));
      if(!location.pathname.includes("/profiles")) {
        navigate(location.pathname);
      }
    }
    if(data && user) {
      if(p) {
        navigate("/home");
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, data])

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeWelcome />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/logout" element={<Auth />} />
        <Route path="/home" element={<RequiredAuth><Home /></RequiredAuth>} />
        <Route path="/profiles/browse" element={<RequiredAuth><Profiles /></RequiredAuth>} />
        <Route path="/profiles/add" element={<RequiredAuth><ProfileAdd /></RequiredAuth>} />
        <Route path="/profiles/manage" element={<RequiredAuth><ProfilesEdit /></RequiredAuth>} />
        <Route path="/profiles/edit" element={<RequiredAuth><ProfileEdit /></RequiredAuth>} />
        <Route path="/tv" element={<RequiredAuth><Tvs /></RequiredAuth>} />
        <Route path="/movies" element={<RequiredAuth><Movies /></RequiredAuth>} />
        <Route path="/my-list" element={<RequiredAuth><MyList /></RequiredAuth>} />
        <Route path="/search" element={<RequiredAuth><SearchResult /></RequiredAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
