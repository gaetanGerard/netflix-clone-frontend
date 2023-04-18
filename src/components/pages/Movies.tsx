import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from "@apollo/client";

// Import Styles
import '../../styles/home.scss';

// Import redux
import { selectProfile } from '../../redux/profile/profile.action';
import { setApplicationLanguage } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";
import { discover_movies } from '../../redux/movies/movies.actions';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';

// Import utils
import { DISCOVERS } from '../../utils/query';

// Import Data
import footerData from '../../data/footer.json';

type Props = {}

const Movies = (props: Props) => {
  document.title = "Movies - Netflix" //! to update when add language json
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = location.state;
  const p = useSelector((state: RootState) => state.profile.profile);
  const discoveredMovies = useSelector((state: RootState) => state.movies.discoverMovies);
  const lang = useSelector((state: RootState) => state.utils.language);
  const language = p ? p.profile.language : lang;
  const options = useSelector((state: RootState) => state.utils.languageOptions);
  const [myList, setMyList] = useState(null)

  const [discoverMovies, resultDiscoverMovies] = useLazyQuery (DISCOVERS);

  const changeLanguage = (e: any) => {
    dispatch(setApplicationLanguage(e.target.value))
}


  if(profile) {
    if(profile.profile) {
        dispatch(selectProfile(profile));
    } else if (!profile.profile) {
        navigate("/profiles/browse");
    }
  } else if(profile === null && p === null) {
      navigate("/profiles/browse");
  }

  if(p === null && localStorage.getItem('profileSave')) {
      dispatch(selectProfile(JSON.parse(localStorage.getItem('profileSave') || '{}')));
  } else if (p === null && localStorage.getItem('profileSave') === '{}') {
      navigate("/profiles/browse");
  }

  if(p !== null) {
      if (Object.entries(p).length > 0) {
          localStorage.setItem('profileSave', JSON.stringify(p));
      } else {
          navigate("/profiles/browse");
      }
  }

  useEffect(() => {
    discoverMovies({ variables: { media: "movie", language: p.profile.language, kid: p.profile.kid, sortBy: "popularity.desc", page: 1, originalLanguage: "EN" } });

    if(resultDiscoverMovies.data) dispatch(discover_movies(resultDiscoverMovies.data))

}, [discoverMovies, dispatch, language, resultDiscoverMovies.data, p?.profile])

  useEffect(() => {
    if(discoveredMovies) setMyList(discoveredMovies.results);
}, [p, discoveredMovies])

  if(p && myList) {
    return (
        <div className="home-container">
            <Header />
            <FeaturedListItem myList={p.profile.my_list.length > 0 ? p.profile.my_list : myList} />
            <Footer data={footerData[lang.iso]} options={options} language={lang.iso} changeLanguage={changeLanguage} />
        </div>
    )
  } else {
      return (
          <div>Loading...</div>
      )
  }
}

export default Movies