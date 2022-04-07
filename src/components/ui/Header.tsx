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

// Import images
import { profile_pic } from "../../utils/images";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import Types
import { Profile } from '../../types/userTypes';



type Props = {}

const Header = (props: Props) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [kidProfile, setKidProfile] = useState<Profile|null>(null);
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
        }

    }, [u, kidProfile])

    // console.log(p);
    // console.log(kidProfile);

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
                <li><button className="btn"><SearchIcon classname="header-icons" /></button></li>
                {p.profile.kid ? null : (<li><Link to="/home" state={{ profileName: kidProfile !== null ? kidProfile.p_name : null, profile: kidProfile }}>Kids</Link></li>)}
                {p.profile.kid ? null : (<li className="dropdown-btn"><Notification classname="header-icons" /></li>)}
                {p.profile.kid ? (
                    <li className="profile-img">
                        <img src={profile_pic[p.profile.profile_pic]} alt="profile" />
                    </li>
                ) : (
                    <li className="dropdown-btn">
                        <img src={profile_pic[p.profile.profile_pic]} alt="profile" />
                        <Arrow classname="header-icons header-icons-arrow" />
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