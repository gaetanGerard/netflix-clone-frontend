import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Import Styles
import '../../styles/home.scss';

// Import redux
import { selectProfile } from '../../redux/profile/profile.action';
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Header from '../ui/Header';
import FeaturedListItem from '../ui/FeaturedListItem';

// Import utils
import { newListUtility } from '../../utils/function';

type Props = {}

const Tvs = (props: Props) => {
  document.title = "Tv - Netflix" //! to update when add language json
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = location.state;
  const p = useSelector((state: RootState) => state.profile.profile);
  const discoveredMovies = useSelector((state: RootState) => state.movies.discoverMovies);
  const discoveredSeries = useSelector((state: RootState) => state.series.discoverSeries);
  const [myList, setMyList] = useState(null)

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
    if(discoveredMovies && discoveredSeries) setMyList(newListUtility(p, discoveredMovies.results, discoveredSeries.results));
}, [p, discoveredMovies, discoveredSeries])

  if(p && myList) {
    return (
        <div className="home-container">
            <Header />
            <FeaturedListItem myList={p.profile.my_list.length > 1 ? p.profile.my_list : myList} />
        </div>
    )
  } else {
      return (
          <div>Loading...</div>
      )
  }
}

export default Tvs