import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Redux
import { setApplicationLanguage } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";

// Import Data
import footerData from '../../data/footer.json';

// Import Styles
import '../../styles/home.scss';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';

type Props = {}

const NewAndPopular = (props: Props) => {
  const dispatch = useDispatch()
  document.title = "New & Popular - Netflix" //! to update when add language json
  const lang = useSelector((state: RootState) => state.utils.language);
  const options = useSelector((state: RootState) => state.utils.languageOptions);

  const changeLanguage = (e: any) => {
    dispatch(setApplicationLanguage(e.target.value))
}

  return (
    <div className="home-container no-featuredListItem">
        <Header />
        <div>Something Here</div>
        <Footer data={footerData[lang.iso]} options={options} language={lang.iso} changeLanguage={changeLanguage} />
    </div>
  )
}

export default NewAndPopular