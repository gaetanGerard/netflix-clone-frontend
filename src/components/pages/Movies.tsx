import React from 'react';
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

type Props = {}

const Movies = (props: Props) => {
  document.title = "Movies - Netflix" //! to update when add language json
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = location.state;
  const p = useSelector((state: RootState) => state.profile.profile);

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

  if(p) {
    return (
        <div className="home-container">
            <Header />
            <FeaturedListItem myList={p.profile.my_list} />
        </div>
    )
  } else {
      return (
          <div>Loading...</div>
      )
  }
}

export default Movies