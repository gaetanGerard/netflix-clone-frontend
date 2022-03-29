import React, { useState, useEffect, ChangeEvent, Fragment } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";

// Import redux
import { RootState } from "../../redux/root-reducer";

// Import style
import '../../styles/profiles.scss';

// Import data
import dataProfile from "../../data/profiles.json";

// Import images
import { profile_pic } from "../../utils/images";

// Import utils
import { GET_USER } from '../../utils/query';

// Import interfaces
import { User, Profile } from '../../types/userTypes';

// Import Custom Components
import Typography from '../ui/Typography';
import InputText from "../ui/InputText";
import Logo from "../ui/Logo";
import Select from '../ui/Select';
import Button from '../ui/Button';


const ProfileEdit = () => {
    const language = useSelector((state: RootState) => state.utils.language);
    const location: any = useLocation();
    const navigate = useNavigate();
    const { profileName } = location.state;
    const [user, setUser] = useState<User|null>(null)
    const [appLang, setAppLang] = useState<any>(dataProfile[language.name]);
    const [newProfileName, setNewProfileName] = useState<string | null>(null);
    const [profileKid, setProfileKid] = useState<boolean>(false);
    const [langProfile, setLangProfile] = useState<string>(language.name);

    const { loading, error, data } = useQuery(GET_USER, {errorPolicy: 'ignore'});

    useEffect(() => {
        if(data) {
            setUser(data.getUser)
        }
    }, [data, user])

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error...</div>;

    if((profileName === undefined)|| (profileName === null)) {
        navigate('/profiles/manage');
    }

    /*
    *
    *
    * I have to implement this feature
    * 1) retrieve the user profile array
    * 2) populate form with information from the matching profile
    * 3) when click for save so copy the array and update it with the new information
    * 4) save the new array with the update user mutation
    * like that i can with update user mutation update profile information but also remove a profile from the user profile array
    *
    */

    const currentProfile = user?.profiles.find((profile: Profile) => {
        return profile.p_name === profileName;
    })!;

    const indexOfProfile = user?.profiles.findIndex((profile: Profile) => {
        return profile.p_name === profileName;
    })!;

    //console.log(user);
    //console.log(profileName)
    //console.log(currentProfile)
    //console.log(indexOfProfile)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.name === "pName") setNewProfileName(e.target.value);
      if(e.target.name === "kid") setProfileKid(e.target.checked);
    }

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLangProfile(e.target.value);
    }

    const onClick = () => {
      console.log("click");
    }

    const disabled = false;

  if(currentProfile === undefined) return <div>Profile not found</div>;
  return (
    <div className="profiles-container">
      <header>
          <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
      </header>
      <div className="profile-edit-container">
        <Typography HTMLElement="h2" classname="title">{appLang.edit_profile.title}</Typography>
        <div className="profile-edit-content-container">
          <div className="profile-edit-content-section">
            <img className="profile_pic" src={profile_pic[currentProfile.profile_pic]} alt="Profile"/>
            <div className="right-content-section">
              <InputText fieldName="profile-name-edit" FCClassname="dim" labelActivate={false} type="text" name="pName"   onChange={onChange} label={appLang.add_profile.input_name} value={profileName} />
              <div className="right-content-section-content">
                  <Typography HTMLElement="h4" classname="title">{appLang.edit_profile.language.title}</Typography>
                  <Select options={appLang.edit_profile.language.lang_array} name="language" selected={langProfile} onchange={(e) => changeLanguage(e)} />
              </div>
            </div>
          </div>
          <div className="profile-edit-content-section">
            <div></div>
            <div className="right-content-section right-content-section-with-border">
              <div className="right-content-section-content">
                  <Typography HTMLElement="h4" classname="title">{appLang.edit_profile.maturity_settings.title}</Typography>
                  <ul>
                    {currentProfile.kid ?
                         (
                          <Fragment>
                            <li>{appLang.edit_profile.maturity_settings.maturity[2]}</li>
                            <li>{appLang.edit_profile.maturity_settings.maturity[3]}</li>
                          </Fragment>

                        )
                      :
                        (
                          <Fragment>
                            <li>{appLang.edit_profile.maturity_settings.maturity[0]}</li>
                            <li>{appLang.edit_profile.maturity_settings.maturity[1]}</li>
                          </Fragment>
                        )}
                  </ul>
                  <p>{currentProfile.kid ? appLang.edit_profile.maturity_settings.kid_content : appLang.edit_profile.maturity_settings.adults_content}</p>
                  <button className="btn" disabled>{appLang.edit_profile.maturity_settings.btn_edit}</button>
              </div>
            </div>
          </div>
          <div className="profile-edit-content-section">
            <div></div>
            <div className="right-content-section right-content-section-with-border">
              <div className="right-content-section-content">
                  <Typography HTMLElement="h4" classname="title">{appLang.edit_profile.autoplay.title}</Typography>
                  <div className="autoplay-checkbox">
                    <input type="checkbox" name="autoPlayNextEpisode" id="autoPlayNextEpisode" onChange={onChange} title={appLang.edit_profile.autoplay.autoplay_next_episode} defaultChecked={currentProfile.autoplay_next_episode} />
                    <label htmlFor='autoPlayNextEpisode'>{appLang.edit_profile.autoplay.autoplay_next_episode}?</label>
                  </div>
                  <div className="autoplay-checkbox">
                    <input type="checkbox" name="autoPlayPreview" id="autoPlayPreview" onChange={onChange} title={appLang.edit_profile.autoplay.autoplay_preview} defaultChecked={currentProfile.autoplay_preview}  />
                    <label htmlFor='autoPlayPreview'>{appLang.edit_profile.autoplay.autoplay_preview}?</label>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <Button btnType="submit" classname="btn btn-save" onclick={onClick} disabled={disabled}>{appLang.edit_profile.btn_complete}</Button>
          <Link to="/profiles/manage" className="btn" >{appLang.edit_profile.btn_cancel}</Link>
          {indexOfProfile === 0 ? null : <Button btnType="submit" classname="btn" onclick={onClick} disabled={disabled}>{appLang.edit_profile.btn_delete}</Button>}
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit;