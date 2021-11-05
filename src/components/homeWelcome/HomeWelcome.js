/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment, useState, useEffect } from 'react'

// Import Custom Components
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Typography from '../ui/Typography';
import InputText from '../ui/InputText';
import Accordion from '../ui/accordion/Accordion';

// Import images
import section2Mobile from '../../images/home/mobile-0819.jpg';
import boxshot from '../../images/home/boxshot.png';
import devicePile from '../../images/home/device-pile.png';
import tv from '../../images/home/tv.png';
import tvVideo from '../../images/home/video-tv-0819.m4v';
import videoDevice from '../../images/home/video-devices.m4v';
import kids from '../../images/home/kids.png';

// Import Styles
import "../../styles/homeWelcome.scss";

// Import Data
import data from "../../data/home.json";

const HomeWelcome = () => {
    const [language, setLanguage] = useState("Français");
    const languageOption = ["Français", "Nederlands", "English"];
    const [langData, setLangData] = useState(data[language]);

    useEffect(() => {
        document.title = langData.documentTitle
    }, [langData])


    // TODO
    const signIn = (e) => {
        e.preventDefault();
        // console.log(e);
    }

    // TODO
    const submitForm = (e) => {
        // e.preventDefault();
    }

    const changeLanguage = (e) => {
        setLanguage(e.target.value);
        setLangData(data[e.target.value]);
    }

    console.log(langData)

    if(langData !== undefined) {
        return (
            <Fragment>
                <div className="section-1">
                    <div className="header">
                        <Logo classname="svg-icon svg-icon-netflix-logo nfLogo" />
                        <div className="signInAndLanguage">
                            <Select options={languageOption} name="language" selected={language} onchange={(e) => changeLanguage(e)} />
                            <Button btnType="button" classname="btn auth-btn" onclick={(e) => signIn(e)}>{langData["section-1"].loginButton}</Button>
                        </div>
                    </div>
                    <div className="content">
                        <Typography HTMLElement="h1" classname="hero-card">{langData["section-1"].title}</Typography>
                        <Typography HTMLElement="h2" classname="our-story">{langData["section-1"].subtitle}</Typography>
                        <div className="email-form">
                            <Typography HTMLElement="h3" classname="title">{langData["section-1"].text}</Typography>
                            <div className="inputContainer">
                                <InputText fieldName="section-1-email" label={langData["section-1"].input.label} errorMsg={langData["section-1"].input.helperText} />
                                <Button btnType="submit" classname="btn submitForm-btn" onclick={(e) => submitForm(e)}>
                                    <span>{langData["section-1"].input.buttonText}</span>
                                    <span className="right-chevron"></span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-2">
                    <div className="animation-container">
                        <div className="animation-container-text">
                            <Typography HTMLElement="h1" classname="animation-container-text-title">{langData["section-2"].title}</Typography>
                            <Typography HTMLElement="h2" classname="animation-container-text-content">{langData["section-2"].text}</Typography>
                        </div>
                        <div className="animation-container-img">
                            <div className="animation-container-img-container">
                                <img src={tv} alt="TV" />
                                <div className="animation-container-img-animation">
                                    <video autoPlay muted loop>
                                        <source src={tvVideo} />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-3">
                    <div className="animation-container">
                        <div className="animation-container-img">
                            <img src={section2Mobile} alt="Mobile device picture" />
                            <div className="animation-container-downloadAndWatch">
                                <div className="downloadAndWatch-img">
                                    <img src={boxshot} alt="Stranger Things cover" />
                                </div>
                                <div className="downloadAndWatch-text">
                                    <Typography HTMLElement="p" classname="downloadAndWatch-text-title">{langData["section-3"].animation.title}</Typography>
                                    <Typography HTMLElement="p" classname="downloadAndWatch-text-par">{langData["section-3"].animation.text}</Typography>
                                </div>
                                <div className="downloadAndWatch-gif"></div>
                            </div>
                        </div>
                        <div className="animation-container-text">
                            <Typography HTMLElement="h1" classname="animation-container-text-title">{langData["section-3"].title}</Typography>
                            <Typography HTMLElement="h2" classname="animation-container-text-content">{langData["section-3"].text}</Typography>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-4">
                    <div className="animation-container">
                        <div className="animation-container-text">
                            <Typography HTMLElement="h1" classname="animation-container-text-title">{langData["section-4"].title}</Typography>
                            <Typography HTMLElement="h2" classname="animation-container-text-content">{langData["section-4"].text}</Typography>
                        </div>
                        <div className="animation-container-img">
                            <div className="animation-container-img-container">
                                <img src={devicePile} alt="Device Pile" />
                                <div className="animation-container-img-animation animation-section-4">
                                    <video autoPlay muted loop>
                                        <source src={videoDevice} />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-5">
                    <div className="animation-container">
                        <div className="animation-container-img">
                            <img src={kids} alt="Mobile device picture" />
                        </div>
                        <div className="animation-container-text">
                            <Typography HTMLElement="h1" classname="animation-container-text-title">{langData["section-5"].title}</Typography>
                            <Typography HTMLElement="h2" classname="animation-container-text-content">{langData["section-5"].text}</Typography>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-6">
                    <Typography HTMLElement="h1" classname="title">{langData["section-6"].title}</Typography>
                    <Accordion accordion={langData["section-6"].accordion} />
                    <div className="email-form">
                        <Typography HTMLElement="h3" classname="title">{langData["section-1"].text}</Typography>
                        <div className="inputContainer">
                            <InputText fieldName="section-1-email" label={langData["section-6"].input.label} errorMsg={langData["section-6"].input.helperText} />
                            <Button btnType="submit" classname="btn submitForm-btn" onclick={(e) => submitForm(e)}>
                                <span>{langData["section-6"].input.buttonText}</span>
                                <span className="right-chevron"></span>
                            </Button>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-7">
                    <div className="footer-container">
                        <div className="site-footer">
                            <Typography HTMLElement="p" classname="phone-number">{langData["section-7"].title} <a href="TO BE DEFINE">{langData["section-7"].tel}</a></Typography>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <p>Loading...</p>
            </Fragment>
        )
    }

}

export default HomeWelcome
