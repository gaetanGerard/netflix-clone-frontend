/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Logo from "../ui/Logo";
import Add from "../ui/icons/Add";

// Import style
import '../../styles/profiles.scss';

// Import data
import dataProfile from "../../data/profiles.json";

// Import images
import { profile_pic } from "../../utils/images";

interface Props {

}

const Profiles = (props: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const language = useSelector((state: RootState) => state.utils.language);
    const [appLang, setAppLang] = useState(dataProfile[language.name]);

    return (
        <div className="profiles-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
            </header>
            <div className="profiles-content">
                <h2>{appLang.browse_profile.title}</h2>
                <div className="profiles-list">
                    {user ? user.profiles.map((profile: any, index: number) => (
                        <Link to="TO CHANGE" className="profile-item" key={`${profile.p_name}_${index++}`}>
                            <div className="profile_pic_container">
                                <img className="profile_pic" src={profile.profile_pic ? profile_pic[profile.profile_pic] : profile_pic[index++]} alt="Profile"/>
                            </div>
                            <p>{profile.p_name}</p>
                        </Link>
                    )) : null}
                    <div className="profile-item">
                        <Link to="/profiles/add" className="profile_pic_container p_container_svg">
                            <Add classname="svg_icon_profile_pic profile_pic" />
                        </Link>
                        <p>{appLang.browse_profile.btn_add}</p>
                    </div>
                </div>
                <Link to="/profiles/manage" className="btn_edit_profile">{appLang.browse_profile.btn_edit}</Link>
            </div>
        </div>
    )
}

export default Profiles
