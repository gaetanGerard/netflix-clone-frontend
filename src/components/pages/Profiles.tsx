/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Logo from "../ui/Logo";
import Add from "../ui/icons/Add";
import ProfileBody from "../profiles/ProfileBody";

// Import style
import '../../styles/profiles.scss';

// Import data
import dataProfile from "../../data/profiles.json";

// Import images
import { profile_pic } from "../../utils/images";

// Import utils
import { GET_USER } from '../../utils/query';

// Import interfaces
import { User } from '../../types/userTypes';

const Profiles = () => {
    const language = useSelector((state: RootState) => state.utils.language);
    const [user, setUser] = useState<User|null>(null)
    const [appLang, setAppLang] = useState<any>(dataProfile[language.name]);

    const { loading, error, data } = useQuery(GET_USER, {errorPolicy: 'ignore'});

    useEffect(() => {
        if(data) {
            setUser(data.getUser)
        }
    }, [data, user])

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error...</div>;
    return (
        <div className="profiles-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
            </header>
            <ProfileBody appLang={appLang.browse_profile} user={user} profile_pic={profile_pic} edit={false} />
        </div>
    )
}

export default Profiles
