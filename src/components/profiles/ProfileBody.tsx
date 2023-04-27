import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@apollo/client";

// Import Custom Components
import Add from "../ui/icons/Add";
import Edit from "../ui/icons/Edit";

// Import redux
import { login } from '../../redux/auth/auth.actions';
import { selectProfile } from '../../redux/profile/profile.action';
import { RootState } from "../../redux/root-reducer";

// Import utils
import { GET_USER } from '../../utils/query';

// Import interfaces
import { User } from '../../types/userTypes';

// Import style
import '../../styles/profiles.scss';

interface Props {
    appLang: any
    user: User|null
    profile_pic: string[]
    edit: boolean
}

export default function ProfileBody(props: Props) {
    const dispatch = useDispatch();
    const u = useSelector((state: RootState) => state.auth.user);
    const p = useSelector((state: RootState) => state.profile.profile);
    const [user, setUser] = useState<User|null>(props.user ? u ? props.user : u : null);

    const { loading, error, data } = useQuery(GET_USER, {errorPolicy: 'ignore'});

    useEffect(() => {
        if(props.user === undefined || props.user === null) {
            if(data && !u && localStorage.getItem('token')) {
                dispatch(login(data.getUser));
                setUser(data.getUser);
            };
        }
    }, [data, dispatch, props.user, u])

    if(user) {
        return (
            <div className="profiles-content">
                <h2>{props.appLang.title}</h2>
                <div className="profiles-list"></div>
                <div className="profiles-list">
                    {user ? user?.profiles?.map((profile: any, index: number) => (
                            <Link to={props.edit ? "/profiles/edit" : "/home"} onClick={() => selectProfile(profile)} state={{ profileName: profile.p_name, profile }} className="profile-item" key={`${profile.p_name}_${index++}`}>
                                <div className={props.edit ? "profile_pic_container profile_pic_container_edit" : "profile_pic_container"}>
                                    {props.edit ? <Edit classname="svg-icon svg-icon-edit" /> : null}
                                    <img className="profile_pic" src={props.profile_pic[profile.profile_pic]} alt="Profile"/>
                                </div>
                                <p>{profile.p_name}</p>
                            </Link>
                    )) : null}
                    <div className="profile-item">
                        <Link to="/profiles/add" className="profile_pic_container p_container_svg">
                            <Add classname="svg_icon_profile_pic profile_pic" />
                        </Link>
                        <p>{props.appLang.btn_add}</p>
                    </div>
                </div>
                {props.edit ? (<Link to="/profiles/browse" className="btn_edit_profile btn_manage_profile">{props.appLang.btn_complete}</Link>) : (<Link to="/profiles/manage" className="btn_edit_profile">{props.appLang.btn_edit}</Link>)}
            </div>
        )
    } else return null;

}