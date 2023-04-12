import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Redux
import { setApplicationLanguage } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";

// Import Data
import footerData from '../../data/footer.json';

// Import Styles
import '../../styles/home.scss';
import '../../styles/card.scss';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import ItemCard from '../ui/ItemCard';
import Typography from '../ui/Typography';

type Props = {}

const MyList = (props: Props) => {
  const dispatch = useDispatch()
  document.title = "My List - Netflix" //! to update when add language json
  const lang = useSelector((state: RootState) => state.utils.language);
  const options = useSelector((state: RootState) => state.utils.languageOptions);
  const p = useSelector((state: RootState) => state.profile.profile);

  const changeLanguage = (e: any) => {
    dispatch(setApplicationLanguage(e.target.value))
}

if(p) {

  const itemInMyList = (myList, item) => {
    if(myList.includes(item)) {
      return true
    } else {
      return false
    }
  }

    return (
      <div className="home-container no-featuredListItem">
          <Header />
          <div className="myList-body-container">
            <Typography HTMLElement="h2" classname="title">My List</Typography>
            <div className="card-container">
              {p.profile.my_list.length > 0 ? p.profile.my_list.map((item, i=1) => (
                <ItemCard key={item.id} item={item} itemID={i++} isInMyList={itemInMyList(p.profile.my_list, item)} />
              )) : <p>No Item in the List</p>}
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