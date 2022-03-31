import React, { FC, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { client } from '../../index';
import { useSelector, useDispatch } from 'react-redux';
// Import redux
import { RootState } from "../../redux/root-reducer";
import { logout } from '../../redux/auth/auth.actions';

// Import custom Component
import Logo from "../ui/Logo";
import Footer from "../ui/Footer";
import Typography from "../ui/Typography";

// Import Types
import { LanguageOptions } from '../../types/languageTypes';

type LogoutProps = {
    language: string,
    data: any,
    changeLanguage: (e?: ChangeEvent<HTMLSelectElement> | undefined) => void,
    options: LanguageOptions[],
}

const Logout: FC<LogoutProps> = ({ language, data, changeLanguage, options }): JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    document.title = data[language].documentTitle;
    const navigate = useNavigate();

    const headerData = data[language].header;
    const footerData = data[language].footer;
    const bodyData = data[language].body;

    setTimeout(() => {
        navigate("/", { replace: true})
    }, 30000);

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("profileSave");
        if(!localStorage.getItem('token')) dispatch(logout());
        client.resetStore();
    }, [])

    return (
        <div className="logout-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                <Link to={headerData.link.to} className="btn signIn-btn">{headerData.link.text}</Link>
            </header>
            <div className="logout-body">
                <Typography HTMLElement="h2" classname="title">{bodyData.title}</Typography>
                <Typography HTMLElement="p">{bodyData["text1"]}</Typography>
                <Typography HTMLElement="p">{bodyData["text2"]}</Typography>
                <Link to={bodyData["goNow-link"].to} className="btn info-btn">{bodyData["goNow-link"].text}</Link>
            </div>
            <Footer data={footerData} options={options} language={language} changeLanguage={changeLanguage} />
        </div>
    )
}

export default Logout
