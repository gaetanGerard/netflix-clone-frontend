import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Import Styles
import '../../styles/header.scss';

// Import Custom Components
import Logo from './Logo';
import Notification from './icons/Notification';
import SearchIcon from './icons/Search';



type Props = {}

const Header = (props: Props) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

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
    })

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
                <li><SearchIcon classname="header-icons" /></li>
                <li>Kids</li>
                <li><Notification classname="header-icons" /></li>
                <li>Profile</li>
            </ul>
        </div>
    </div>
  )
}

export default Header