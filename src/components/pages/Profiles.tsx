/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Logo from "../ui/Logo";
import ProfileBody from "../profiles/ProfileBody";

// Import style
import '../../styles/profiles.scss';

// Import data
import dataProfile from "../../data/profiles.json";

// Import images
import { profile_pic } from "../../utils/images";

const Profiles = () => {
    const language = useSelector((state: RootState) => state.utils.language);
    const u = useSelector((state: RootState) => state.auth.user);
    const [appLang, setAppLang] = useState<any>(dataProfile[language.iso]);
    return (
        <div className="profiles-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
            </header>
            <ProfileBody appLang={appLang.browse_profile} user={u} profile_pic={profile_pic} edit={false} />
        </div>
    )
}

export default Profiles
