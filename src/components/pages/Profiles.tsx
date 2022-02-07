/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Logo from "../ui/Logo";

// Import style
import '../../styles/profiles.scss';

// Import data
import data from "../../data/profiles.json";

interface Props {

}

const Profiles = (props: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const language = useSelector((state: RootState) => state.utils.language);
    const [appLang, setAppLang] = useState(data[language.name]);


    console.log(user);

    return (
        <div className="profiles-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
            </header>
            <div className="profiles-content">
                <h2>{appLang.manage_profile.title}:</h2>
                <div className="profiles-list">
                    {user ? user.profiles.map((profile: any, index: number) => (
                        <div className="profile-item" key={index++}>
                            <p>{profile.p_name}</p>
                        </div>
                    )) : null}
                    <div className="profile-item">
                        <p>{appLang.manage_profile.btn_add}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles
