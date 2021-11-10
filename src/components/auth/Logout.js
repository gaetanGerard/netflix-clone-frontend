import React from 'react';
import { Link, useNavigate } from "react-router-dom";

// Import custom Component
import Logo from "../ui/Logo";
import Footer from "../ui/Footer";
import Typography from "../ui/Typography";

const Logout = ({ language, data, changeLanguage, options, logout }) => {
    document.title = data[language].documentTitle;
    const navigate = useNavigate();

    const headerData = data[language].header;
    const footerData = data[language].footer;
    const bodyData = data[language].body;

    // setTimeout(() => {
    //     navigate("/", { replace: true})
    // }, 30000);

    return (
        <div className="logout-container">
            <header>
                <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                <Link to={headerData.link.to} className="btn signIn-btn">{headerData.link.text}</Link>
            </header>
            <div className="logout-body">
                <Typography HTMLElement="h2" classname="title">{bodyData.title}</Typography>
                <Typography HTMLElement="p">{bodyData["text-1"]}</Typography>
                <Typography HTMLElement="p">{bodyData["text-2"]}</Typography>
                <Link to={bodyData["goNow-link"].to} className="btn info-btn">{bodyData["goNow-link"].text}</Link>
            </div>
            <Footer data={footerData} options={options} language={language} changeLanguage={changeLanguage} />
        </div>
    )
}

export default Logout