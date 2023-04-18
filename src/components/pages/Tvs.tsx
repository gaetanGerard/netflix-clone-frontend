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
import { discover_series } from '../../redux/series/series.actions';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';

// Import utils
import { DISCOVERS } from '../../utils/query';

// Import Data
import footerData from '../../data/footer.json';

type Props = {}

const Tvs = (props: Props) => {
  document.title = "Tv - Netflix" //! to update when add language json
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = location.state;
  const p = useSelector((state: RootState) => state.profile.profile);
  const discoveredSeries = useSelector((state: RootState) => state.series.discoverSeries);
  const lang = useSelector((state: RootState) => state.utils.language);
  const language = p ? p.profile.language : lang;
  const options = useSelector((state: RootState) => state.utils.languageOptions);
  const [myList, setMyList] = useState(null)

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
    discoverSeries({ variables: { media: "tv", language: p.profile.language, kid: p.profile.kid, sortBy: "popularity.desc", page: 1, originalLanguage: "EN" } });

    if(resultDiscoverSeries.data) dispatch(discover_series(resultDiscoverSeries.data))

}, [discoverSeries, dispatch, language, resultDiscoverSeries.data, p?.profile])

  useEffect(() => {
    if(discoveredSeries) setMyList(discoveredSeries.results);
}, [p, discoveredSeries])

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

export default Tvs