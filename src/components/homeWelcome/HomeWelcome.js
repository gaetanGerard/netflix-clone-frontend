import React, { Fragment, useState, useEffect } from 'react'

import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Select from '../ui/Select';

import "../../styles/homeWelcome.scss";

const HomeWelcome = () => {
    const [language, setLanguage] = useState(null);
    const languageOption = ["Français", "Nederlands", "English"];


    const signIn = (e) => {
        e.preventDefault();
        console.log(e);
    }

    const changeLanguage = (e) => {
        setLanguage(e.target.value);
    }

    useEffect(() => {
        if (language === null) setLanguage(languageOption[0]);
    /*
    *
    *
    * Find solution for add dependencies whitout warning
    *
    */
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    console.log(language);

    return (
        <Fragment>
            <div className="section-1">
                <div className="header">
                    <Logo classname="svg-icon svg-icon-netflix-logo nfLogo" />
                    <div className="signInAndLanguage">
                        <Select options={languageOption} selectedLanguage={language} onchange={(e) => changeLanguage(e)} />
                        <Button btnType="button" btnText="Sign In" classname="btn auth-btn" onclick={(e) => signIn(e)} />
                    </div>
                </div>
                <div className="content"></div>
            </div>
            <span className="divider"></span>
        </Fragment>
    )
}

export default HomeWelcome
