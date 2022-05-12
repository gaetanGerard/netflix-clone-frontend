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
import { discover_series } from '../../redux/series/series.actions';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';

// Import utils
import { DISCOVERS } from '../../utils/query';
import { newListUtility } from '../../utils/function';

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
  const discoveredSeries = useSelector((state: RootState) => state.series.discoverSeries);
  const lang = useSelector((state: RootState) => state.utils.language);
  const language = p ? p.profile.language : lang;
  const options = useSelector((state: RootState) => state.utils.languageOptions);
  const [myList, setMyList] = useState(null)

  const [discoverMovies, resultDiscoverMovies] = useLazyQuery (DISCOVERS);
  const [discoverSeries, resultDiscoverSeries] = useLazyQuery (DISCOVERS);

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
    discoverMovies({ variables: { media: "movie", language: language, sortBy: "popularity.desc", primaryReleaseDateGte: "2018" } });
    discoverSeries({ variables: { media: "tv", language: language, sortBy: "popularity.desc", primaryReleaseDateGte: "2018" } });

    if(resultDiscoverMovies.data) dispatch(discover_movies(resultDiscoverMovies.data))
    if(resultDiscoverSeries.data) dispatch(discover_series(resultDiscoverSeries.data))

}, [discoverMovies, discoverSeries, dispatch, language, resultDiscoverMovies.data, resultDiscoverSeries.data])

  useEffect(() => {
    if(discoveredMovies && discoveredSeries) setMyList(newListUtility(p, discoveredMovies.results, discoveredSeries.results));
}, [p, discoveredMovies, discoveredSeries])

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