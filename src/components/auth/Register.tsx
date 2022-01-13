import React, { useState, FC, ChangeEvent } from 'react';
import { Link } from "react-router-dom";

// Import Custom Components
import Stepper from "../ui/stepper/Stepper";
import Footer from "../ui/Footer";
import Logo from "../ui/Logo";

type RegisterProps = {
    language: string,
    data: any,
    changeLanguage: (e?: ChangeEvent<HTMLSelectElement> | undefined) => void
    options: string[]
}

const Register: FC<RegisterProps> = ({ language, data, changeLanguage, options }): JSX.Element => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [specialOffers, setSpecialOffers] = useState<boolean>(false);
    const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
    document.title = data[language].documentTitle;
    const register = data[language]

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "userEmail") setUserEmail(e.target.value);
        if(e.target.name === "password") setPassword(e.target.value);
        if(e.target.name === "specialOffers") setSpecialOffers(e.target.checked)
    }

    const userData = {userEmail, password, specialOffers, subscriptionPlan}

    return (
        <div className="register-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                <Link to={register.header.link.to} className="login-link">{register.header.link.text}</Link>
            </header>
            <Stepper steps={register.body} onChange={onChange} userData={userData} setSubscriptionPlan={setSubscriptionPlan} />
            <Footer data={register.footer} options={options} language={language} changeLanguage={changeLanguage} />
        </div>
    )
}

export default Register
