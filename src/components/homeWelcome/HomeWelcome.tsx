/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment, useState, useEffect, ChangeEvent } from 'react'
import validator from 'validator';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Import Custom Components
import Logo from '../ui/Logo';
import Select from '../ui/Select';
import Typography from '../ui/Typography';
import InputText from '../ui/InputText';
import Accordion from '../ui/accordion/Accordion';

// Import Redux
import { setApplicationLanguage } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";

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

const HomeWelcome = (): JSX.Element => {
    const dispatch = useDispatch();
    const lang = useSelector((state: RootState) => state.utils.language);
    const options = useSelector((state: RootState) => state.utils.languageOptions);
    const [langData, setLangData] = useState(data[lang.iso]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {

        document.title = langData.documentTitle
    }, [langData, lang])

    const onChangeUserEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
        const emailCheck = validator.isEmail(e.target.value);
        setDisabled(!emailCheck);
    }

    // TODO -> Redirect to register form
    const submitForm = (e: any) => {
        const targetClassList = e.target.parentNode!.parentNode!.classList;
        if(userEmail) {
            // if email is valid
            const emailCheck = validator.isEmail(userEmail);
            setDisabled(!emailCheck)
            targetClassList.forEach(item => {
                if(item === "inputContainer") {
                    toggleClass(e.target.parentNode.parentNode.children[0], false)
                } else if(item === "email-form") {
                    toggleClass(e.target.parentNode.children[0], false)
                }
            })
        } else {
            // if email not valid
            setDisabled(true);
            targetClassList.forEach(item => {
                if(item === "inputContainer") {
                    toggleClass(e.target.parentNode.parentNode.children[0], true)
                } else if(item === "email-form") {
                    toggleClass(e.target.parentNode.children[0], true)
                }
            })
        }
    }

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLangData(data[e.target.value]);
        dispatch(setApplicationLanguage(e.target.value))
    }

    const toggleClass = (arg, isNotValide) => {
        if(isNotValide) {
            arg.children[1].classList.remove('helperText-hide');
            arg.children[1].classList.add('helperText-show');
            arg.children[0].classList.add('form-field--is-empty')
        } else {
            arg.children[1].classList.add('helperText-hide');
            arg.children[1].classList.remove('helperText-show');
            arg.children[0].classList.remove('form-field--is-empty')
        }

    }

    useEffect(() => {}, [disabled, lang])

    if(langData !== undefined) {
        return (
            <div className="homeWelcome">
                <div className="section-1">
                    <div className="header">
                        <Logo classname="svg-icon svg-icon-netflix-logo nfLogo" />
                        <div className="signInAndLanguage">
                            <Select options={options} name="language" selected={lang.label} onchange={(e) => changeLanguage(e)} />
                            <Link to="login" className="btn auth-btn">{langData["section-1"].loginButton}</Link>
                        </div>
                    </div>
                    <div className="content">
                        <Typography HTMLElement="h1" classname="hero-card">{langData["section-1"].title}</Typography>
                        <Typography HTMLElement="h2" classname="our-story">{langData["section-1"].subtitle}</Typography>
                        <div className="email-form">
                            <Typography HTMLElement="h3" classname="title">{langData["section-1"].text}</Typography>
                            <div className="inputContainer">
                                <InputText fieldName="section-1-email" type="text" name="userEmail" onChange={onChangeUserEmail} label={langData["section-1"].input.label} errorMsg={langData["section-1"].input.helperText} />
                                <Link to="/register" className={`btn submitForm-btn ${disabled ? "deactivate-link" : ""}`} onClick={(e) => submitForm(e)}>
                                    <span>{langData["section-1"].input.buttonText}</span>
                                    <span className="right-chevron"></span>
                                </Link>
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
                            <InputText fieldName="section-1-email" name="userEmail" type="text" onChange={onChangeUserEmail} label={langData["section-6"].input.label} errorMsg={langData["section-6"].input.helperText} />
                            <Link to="/register" className={`btn submitForm-btn ${disabled ? "deactivate-link" : ""}`} onClick={(e) => submitForm(e)}>
                                <span>{langData["section-6"].input.buttonText}</span>
                                <span className="right-chevron"></span>
                            </Link>
                        </div>
                    </div>
                </div>
                <span className="divider"></span>
                <div className="section-7">
                    <div className="footer-container">
                        <div className="site-footer">
                            <Typography HTMLElement="p" classname="phone-number">{langData["section-7"].title} <a href={`tel:${langData["section-7"].tel}`}>{langData["section-7"].tel}</a></Typography>
                            <div className="site-footer-link">
                                {langData["section-7"]["column-link"].map((col: string[], i: number) => (
                                    <div className="col" key={`footer-link-col${i++}`}>
                                        {col.map((row, j) => (
                                            <a href="TO BE DEFINE" className="row" key={`footer-link-row-${j++}`}>{row}</a>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <Select options={options} name="language" selected={lang.label} onchange={(e) => changeLanguage(e)} />
                            <Typography HTMLElement="p" classname="footer-country">{langData["section-7"].copyright}</Typography>
                        </div>
                    </div>
                </div>
            </div>
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
