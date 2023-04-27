import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Utils
import { itemInMyList } from '../../utils/function';

// Import Redux
import { selectProfile } from '../../redux/profile/profile.action';
import { setApplicationLanguage, resetShowModal } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";

// Import Data
import footerData from '../../data/footer.json';
import pageLangData from '../../data/seriesMoviesMyList.json';

// Import Styles
import '../../styles/home.scss';
import '../../styles/card.scss';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import ItemCard from '../ui/ItemCard';
import Typography from '../ui/Typography';
import Modal from "../ui/Modal";

type Props = {}

const MyList = (props: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.utils.language);
  const options = useSelector((state: RootState) => state.utils.languageOptions);
  const p = useSelector((state: RootState) => state.profile.profile);
  const movie = useSelector((state: RootState) => state.movies.movie);
  const movieCast = useSelector((state: RootState) => state.movies.movieCast);
  const tv = useSelector((state: RootState) => state.series.series);
  const mediaType = useSelector((state: RootState) => state.utils.mediaType);
  const showModal = useSelector((state: RootState) => state.utils.showModal);
  const language = p ? p.profile.language : lang;
  const [content, setContent] = useState(null)
  const [isInMyList, setIsInMyList] = useState(false)
  const [langData, setLangData] = useState(pageLangData[language])

  useEffect(() => {
    document.title = langData.myList.documentTitle
}, [langData, language])

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

  const changeLanguage = (e: any) => {
    dispatch(setApplicationLanguage(e.target.value))
}

useEffect(() => {
  if(mediaType === "movie") {
      setContent(movie)
  } else if (mediaType === "tv") {
      setContent(tv)
  }
}, [mediaType, movie, tv])

useEffect(() => {
  if(content) {
      setIsInMyList(itemInMyList(p.profile.my_list, content))
  }
}, [content, p?.profile?.my_list])

if(p) {
    return (
      <div className="home-container no-featuredListItem">
          <Header />
          {showModal && <Modal onClose={() => dispatch(resetShowModal())} mediaType={mediaType} content={mediaType === "movie" ? movie : tv} movieCredits={mediaType === "movie" ? movieCast : null} isInMyList={isInMyList} />}
          <div className="myList-body-container">
            <Typography HTMLElement="h2" classname="title">{langData.myList.title}</Typography>
            <div className="card-container">
              {p.profile.my_list.length > 0 ? p.profile.my_list.map((item, i=1) => (
                <ItemCard key={item.id} item={item} itemID={i++} isInMyList={itemInMyList(p.profile.my_list, item)} />
              )) : <p>{langData.myList.empty}</p>}
            </div>
          </div>
          <Footer data={footerData[lang.iso]} options={options} language={lang.iso} changeLanguage={changeLanguage} />
      </div>
    )
} else {
  return (<div>Loading...</div>)
}

}

export default MyList