import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from "react-router-dom";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Logo from "../ui/Logo";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

// Import style
import '../../styles/profiles.scss';

// Import data
import dataProfile from "../../data/profiles.json";

// Import utils
import { profile_pic } from "../../utils/images";
import { ADD_NEW_PROFILE } from "../../utils/mutation";

type Props = {};

const ProfileAdd = ({}: Props) => {
  const navigate = useNavigate();
  const language = useSelector((state: RootState) => state.utils.language);
  const user = useSelector((state: RootState) => state.auth.user);
  const [appLang, setAppLang] = useState(dataProfile[language.name]);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileKid, setProfileKid] = useState<boolean>(false);
  const [picNum, setPicNum] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);

  const randNum = Math.floor(Math.random() * profile_pic.length);

  const [addNewProfile, { data, loading, error, reset }] = useMutation(ADD_NEW_PROFILE, { errorPolicy: 'all' });

useEffect(() => {
  setPicNum(randNum);
}, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "pName") setProfileName(e.target.value);
    if(e.target.name === "kid") setProfileKid(e.target.checked);
}

useEffect(() => {
  if(profileName !== null) setDisabled(false);
  else setDisabled(true);

}, [profileName, user])

const onClick = () => {
  let arr = [...user.profiles];
  const data = {
    p_name: profileName,
    kid: profileKid,
    language: language.iso,
    profile_pic: picNum,
    autoplay_next_episode: true,
    autoplay_preview: true
  }

  const newArr = arr.map(({__typename, ...rest}: any) => {
    return rest;
  });

  newArr.push(data);

  addNewProfile({ variables: { userDetail: { profiles: newArr } } });
  // navigate("/profiles/browse");
  /*
  *
  *
  * After payload send i recieve data that should update the information of the current user in redux before
  * navigating to the browse page.
  *
  *
  *
  *
  */

}


  return (
    <div className="profiles-container">
      <header>
          <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
      </header>
      <div className="profiles-content profiles-content-add">
        <div className="content-add-header">
          <h2>{appLang.add_profile.title}</h2>
          <p>{appLang.add_profile.content}</p>
        </div>
        <div className="content-add-body">
          <div className="profile_pic_container">
            <img className="profile_pic" src={profile_pic[picNum]} alt="Profile"/>
          </div>
          <InputText fieldName="profile-name" type="text" name="pName"   onChange={onChange} label={appLang.add_profile.input_name} />
          <div className="kid-checkbox">
            <input type="checkbox" name="profileKid" id="kid" onChange={onChange} title={appLang.add_profile.checkbox_helper_text} />
            <label htmlFor='kid'>{appLang.add_profile.checkbox_kid}?</label>
          </div>
        </div>
        <div className="content-add-footer">
          <Button btnType="submit" classname="btn btn-add-continue" onclick={onClick} disabled={disabled}>{appLang.add_profile.btn_continue}</Button>
          <Link to="/profiles/browse" className="btn btn-add-cancel" >{appLang.add_profile.btn_cancel}</Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdd;
