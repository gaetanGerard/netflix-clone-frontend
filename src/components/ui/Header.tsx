import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

// Import Types
import { Profile } from '../../types/userTypes';



type Props = {}

const Header = (props: Props) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [searchBtn, setSearchBtn] = useState<boolean>(false);
    const [kidProfile, setKidProfile] = useState<Profile|null>(null);
    const [dropDownProfile, setDropDownProfile] = useState<Profile[]|null>(null);
    const [searchInput, setSearchInput] = useState<string>('');
    const p = useSelector((state: RootState) => state.profile.profile);
    const u = useSelector((state: RootState) => state.auth.user);

    const changeBackground: () => void = () => {
        if(window.scrollY > 66) {
            console.log(window.scrollY);
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground);

        if(u) {
            u.profiles.map(profile => {
                if(profile.kid) {
                    setKidProfile(profile);
                }
            })

            const newProfileArr:Profile[] = []

            while(newProfileArr.length < 2) {
                u.profiles.map(profile => {
                    if(profile.p_name !== p.profileName) {
                        newProfileArr.push(profile);
                    };
                })
            }

            let limitedProfileArr = newProfileArr.slice(0, 2);

            setDropDownProfile(limitedProfileArr);

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [u, kidProfile, p, searchBtn])

    const notificationsData = [
        {
            type: "New Arrival",
            title: "Return to Space",
            date: "4 days ago",
            picture: "return_to_space.jpg"
        },
        {
            type: "New Arrival",
            title: "The Ultimatum: Marry or Move On",
            date: "4 days ago",
            picture: "ultimatum.jpg"
        },
        {
            type: "New Arrival",
            title: "Trivia Quest",
            date: "1 week ago",
            picture: "trivia_quest.jpg"
        },
        {
            type: "New Arrival",
            title: "The Weekend Away",
            date: "1 month ago",
            picture: "the_weekend_away.jpg"
        },
        {
            type: "Top 10 Today: Belgium",
            title: "Watch Them All",
            date: "1 month ago",
            picture: "top_10.jpg"
        },
        {
            type: "New Arrival",
            title: "The Cuphead Show",
            date: "1 month ago",
            picture: "new_arrival.jpg"
        }
    ]


  return (
    <div className={scrolled ? "header-container scrolled" : "header-container"}>
        <Link to="/home"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
        <div className="navigation-container">
            <ul className="navigation-items">
                <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/tv" className={({ isActive }) => isActive ? 'active' : ''}>TV Shows</NavLink></li>
                <li><NavLink to="/movies" className={({ isActive }) => isActive ? 'active' : ''}>Movies</NavLink></li>
                <li><NavLink to="/new-and-popular" className={({ isActive }) => isActive ? 'active' : ''}>New & Popular</NavLink></li>
                <li><NavLink to="/my-list" className={({ isActive }) => isActive ? 'active' : ''}>My List</NavLink></li>
            </ul>
            <ul className="navigation-items">
                <li>
                    { searchBtn ? (
                        <div className="search-box">
                            <SearchIcon classname="header-icons" />
                            <input type="text" placeholder="Titles,people,genre" autoFocus onBlur={() => {setSearchBtn(false); setSearchInput('')}} onChange={e => setSearchInput(e.target.value)} />
                        </div>
                    ) :
                    (
                        <button className="btn" onClick={() => setSearchBtn(true)}><SearchIcon classname="header-icons" /></button>
                    )}
                </li>
                {p.profile.kid ? null : (<li><Link to="/home" state={{ profileName: kidProfile !== null ? kidProfile.p_name : null, profile: kidProfile }}>Kids</Link></li>)}
                {p.profile.kid ? null : (
                    <li className="dropdown-btn notifications-header">
                        <Notification classname="header-icons" />
                        <ul className="dropdown-notifications-content">
                            {notificationsData.map((notification, index) => (
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
                                <Link to="/profiles/manage">Manage Profile</Link>
                            </li>
                            <li>
                                <Avatar classname="header-icons" />
                                <Link to="/account">Account</Link>
                            </li>
                            <li className="li-with-border">
                                <Help classname="header-icons" />
                                <Link to="/help">Help Center</Link>
                            </li>
                            <li className="li-without-column">
                                <Link to="/logout">Sign out of Netflix</Link>
                            </li>
                        </ul>
                    </li>
                )}
                {p.profile.kid ? (
                    <li>
                        <Link to="/profiles/browse" className="btn-back-to-profile">Quitter la section Jeunesse</Link>
                    </li>
                    ) : null}
            </ul>
        </div>
    </div>
  )
}

export default Header