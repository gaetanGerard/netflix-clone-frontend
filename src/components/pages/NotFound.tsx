import React, { FC } from 'react';
import { Link } from "react-router-dom";

// Import Custom Components
import Logo from "../ui/Logo";
import Typography from "../ui/Typography";

// Import styles
import "../../styles/notFound.scss";

const NotFound: FC<{}> = () => {
    return (
        <div className="notFound-container">
            <header>
                <Logo classname="svg-icon svg-icon-netflix-logo nfLogo" />
            </header>
            <div className="notFound-body">
                <div className="notFound-section-1">
                    <Typography HTMLElement="h1">Lost your way?</Typography>
                    <Typography HTMLElement="h3">Sorry, we can't find that page. You'll finds lots to explore on the home page.</Typography>
                    <Link to="/home" className="btn backHome-btn">Netflix Home</Link>
                </div>
                <div className="notFound-section-2">
                    <p>Error Code <span>NSES-404</span></p>
                </div>
                <div className="notFound-section-3">
                    <p>FROM <span>LOST IN SPACE</span></p>
                </div>
            </div>
        </div>
    )
}

export default NotFound
