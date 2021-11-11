import React, { useState } from 'react';
import { Link } from "react-router-dom"

// Import Custom Components
import Stepper from "../ui/stepper/Stepper";
import Footer from "../ui/Footer";
import Logo from "../ui/Logo";

const Register = ({ language, data, changeLanguage, options }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [specialOffers, setSpecialOffers] = useState(false);
    document.title = data[language].documentTitle;
    const register = data[language]

    const onChange = (e) => {
        if(e.target.name === "userEmail") setUserEmail(e.target.value);
        if(e.target.name === "password") setPassword(e.target.value);
        if(e.target.name === "specialOffers") setSpecialOffers(e.target.checked)
    }

    const userData = {userEmail, password, specialOffers}

    console.log(userData)

    return (
        <div className="register-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                <Link to={register.header.link.to} className="login-link">{register.header.link.text}</Link>
            </header>
            <Stepper steps={register.body} onChange={onChange} />
            <Footer data={register.footer} options={options} language={language} changeLanguage={changeLanguage} />
        </div>
    )
}

export default Register
