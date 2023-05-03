/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from "@apollo/client";

// Import Styles
import '../../styles/header.scss';

// Import Custom Components
import Logo from './Logo';
import Notification from './icons/Notification';
import SearchIcon from './icons/Search';
import Arrow from './icons/Arrow';
import Edit from './icons/Edit';
import Avatar from './icons/Avatar';
import Help from './icons/Help';
import Typography from './Typography';

// Import images
import { profile_pic } from "../../utils/images";

// Import redux
import { RootState } from "../../redux/root-reducer";
import { setApplicationLanguage, setSearchResult, setSearchQuery } from '../../redux/utils/utils.actions';

// Import Types
import { Profile } from '../../types/userTypes';

// Import data
import headerData from '../../data/header.json';

// Import Utils
import { MULTI_SEARCH } from '../../utils/query';



type Props = {}

const Header = (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [searchBtn, setSearchBtn] = useState<boolean>(false);
    const [kidProfile, setKidProfile] = useState<Profile|null>(null);
    const [dropDownProfile, setDropDownProfile] = useState<Profile[]|null>(null);
    const [searchInput, setSearchInput] = useState<string>('');
    const p = useSelector((state: RootState) => state.profile.profile);
    const u = useSelector((state: RootState) => state.auth.user);
    const l = useSelector((state: RootState) => state.utils.language);
    const [headerLanguage, setHeaderLanguage] = useState<any>(headerData[l.iso]);
    let timeoutId;

    const changeBackground: () => void = () => {
        if(window.scrollY > 66) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    const [performSearch, { loading, data }] = useLazyQuery(MULTI_SEARCH, {
        variables: { query: searchInput, language: p.profile.language, page: "1" },
      });

    useEffect(() => {
        if(p) dispatch(setApplicationLanguage(p.profile.language))
        changeBackground()
        window.addEventListener("scroll", changeBackground);

        if(u) {
            const newProfileArr:Profile[] = []

            let limitedProfileArr = newProfileArr.slice(0, 2);

            setDropDownProfile(limitedProfileArr);

            setHeaderLanguage(headerData[l.iso]);

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [u, u?.profiles, kidProfile, p, searchBtn])

    const handleSearch = (event) => {
        clearTimeout(timeoutId);
        const newSearchTerm = event.target.value;
        setSearchInput(newSearchTerm);
        timeoutId = setTimeout(() => {
            performSearch();
            // if(data) dispatch(setSearchResult(data.getSearchMulti))
            // navigate('/search');
        }, 2000);
    }

    useEffect(() => {
        if(data && searchInput.length > 0) {
            dispatch(setSearchResult(data.getSearchMulti))
            dispatch(setSearchQuery(searchInput))
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timeoutId = setTimeout(() => {
                navigate('/search')
            }, 2000)
        }
    }, [data, dispatch, searchInput])

    if(p) {
        return (
            <div className={scrolled ? "header-container scrolled" : "header-container"}>
                <Link to="/home"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                <div className="navigation-container">
                    <ul className="navigation-items">
                        <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>{headerLanguage.left[0]}</NavLink></li>
                        <li><NavLink to="/tv" className={({ isActive }) => isActive ? 'active' : ''}>{headerLanguage.left[1]}</NavLink></li>
                        <li><NavLink to="/movies" className={({ isActive }) => isActive ? 'active' : ''}>{headerLanguage.left[2]}</NavLink></li>
                        <li><NavLink to="/my-list" className={({ isActive }) => isActive ? 'active' : ''}>{headerLanguage.left[4]}</NavLink></li>
                    </ul>
                    <ul className="navigation-items">
                        <li>
                            { searchBtn ? (
                                <div className="search-box">
                                    <SearchIcon classname="header-icons" />
                                    <input type="text" placeholder={headerLanguage.right.searchInput} autoFocus onBlur={() => {setSearchBtn(false)}} onChange={handleSearch} value={searchInput} />
                                </div>
                            ) :
                            (
                                <button className="btn" onClick={() => setSearchBtn(true)}><SearchIcon classname="header-icons" /></button>
                            )}
                        </li>
                        {p.profile.kid ? null : (
                            <li className="dropdown-btn notifications-header">
                                <Notification classname="header-icons" />
                                <ul className="dropdown-notifications-content">
                                    {headerLanguage.right.notifications.map((notification, index) => (
                                    <li className="dropdown-notification-item" key={index}>
                                        <div className="img-container">
                                            <img src={`/images/notifications/${notification.picture}`} alt={notification.title} />
                                        </div>
                                        <div className="dropdown-notification-item-content">
                                            <Typography HTMLElement="h3" classname="title">{notification.type}</Typography>
                                            <Typography HTMLElement="h3" classname="title">{notification.title}</Typography>
                                            <Typography HTMLElement="span" classname="title">{notification.date}</Typography>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </li>)}
                        {p.profile.kid ? (
                            <li className="profile-img">
                                <img src={profile_pic[p.profile.profile_pic]} alt="profile" />
                            </li>
                        ) : (
                            <li className="dropdown-btn profile-header">
                                <img src={profile_pic[p.profile.profile_pic]} alt="profile" />
                                <Arrow classname="header-icons header-icons-arrow" />
                                <ul className="dropdown-profile-content">
                                    {dropDownProfile !== null ? dropDownProfile.map(profile => (
                                        <li key={profile.p_name}>
                                            <img src={profile_pic[profile.profile_pic]} alt="profile" />
                                            <Link to="/home" state={{ profileName: profile.p_name, profile: profile }}>{profile.p_name}</Link>
                                        </li>
                                    )) : null}
                                    <li className="li-with-border">
                                        <Edit classname="header-icons" />
                                        <Link to="/profiles/manage">{headerLanguage.right.profile.manageProfile}</Link>
                                    </li>
                                    <li>
                                        <Avatar classname="header-icons" />
                                        <Link to="/account">{headerLanguage.right.profile.account}</Link>
                                    </li>
                                    <li className="li-with-border">
                                        <Help classname="header-icons" />
                                        <Link to="/help">{headerLanguage.right.profile.help}</Link>
                                    </li>
                                    <li className="li-without-column">
                                        <Link to="/logout">{headerLanguage.right.profile.logout}</Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {p.profile.kid ? (
                            <li>
                                <Link to="/profiles/browse" className="btn-back-to-profile">{headerLanguage.right.kid_exit_btn}</Link>
                            </li>
                            ) : null}
                    </ul>
                </div>
            </div>
          )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Header