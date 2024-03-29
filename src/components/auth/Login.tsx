/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, FC, ChangeEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

// Import redux
import { login } from '../../redux/auth/auth.actions';

// Import utils
import { LOGIN_USER } from '../../utils/query';

// Import Custom Components
import Typography from '../ui/Typography';
import InputText from '../ui/InputText';
import Footer from "../ui/Footer";

// Import Logo
import Logo from '../ui/Logo';

// Import Types
import { LanguageOptions } from '../../types/languageTypes';

type LoginProps = {
    language: string,
    loginData: any,
    changeLanguage: (e: ChangeEvent<HTMLSelectElement> | undefined) => void,
    options: LanguageOptions[]
}

const Login: FC<LoginProps> = ({ language, loginData, changeLanguage, options }): JSX.Element => {
    document.title = loginData[language].documentTitle
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState<boolean>(true);

    const [uLogin, { loading, error, data}] = useLazyQuery (LOGIN_USER);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "userEmail") setUserEmail(e.target.value);
        if(e.target.name === "password") setPassword(e.target.value);
        if(e.target.name === "rememberMe") setRememberMe(e.target.checked)
    }

    const onClick = (e) => {
        e.preventDefault();
        uLogin({ variables: { email: userEmail, password: password } });
    }

    if(!localStorage.getItem('token') && loading) return <div>Loading...</div>
    if(!localStorage.getItem('token') && error) return <div>Error...</div>
    if(localStorage.getItem('token')) navigate("/profiles/browse")

    if(data) {
        localStorage.setItem("token", data.loginUser.token);
        dispatch(login(data.loginUser));
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <header>
                    <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                </header>
                <div className="login-body-container">
                    <div className="login-body">
                        <Typography HTMLElement="h2" classname="title">{loginData[language].loginContainer.title}</Typography>
                        <div className="form-wrapper">
                            <InputText fieldName="login-email" type="text" name="userEmail"   onChange={onChange} label={loginData[language].loginContainer.userNameInput.label} errorMsg={loginData[language].loginContainer.userNameInput.helperText} />
                            <InputText fieldName="login-password" type="password" name="password" onChange={onChange}   label={loginData[language].loginContainer.userPasswordInput.label} errorMsg={loginData[language].loginContainer.userPasswordInput.helperText} />
                            <button onClick={(e) => onClick(e)} className="btn login-btn">{loginData[language].loginContainer.buttonText}</button>
                            <div className="rememberOrHelp">
                                <div className="checkbox">
                                    <input type="checkbox"  name="rememberMe" defaultChecked={rememberMe} onChange={e => onChange(e)} />
                                    <label htmlFor="rememberMe">{loginData[language].loginContainer.checkbox}</label>
                                </div>
                                <Link to="/help">{loginData[language].loginContainer.helpLink}</Link>
                            </div>
                        </div>
                        <div className="credentials-test">
                            <p><span style={{fontWeight: 'bold'}}>Username: </span>test@test.com</p>
                            <p><span style={{fontWeight: 'bold'}}>Password: </span>azerty123</p>
                        </div>
                        <div className="other-login-method">
                            <div className="with-fb">
                                <div className="fb-icon"></div>
                                <p>{loginData[language].loginContainer.loginWithFB}</p>
                            </div>
                            <div className="new-to-netflix">
                                <p>{loginData[language].loginContainer.firstVisit.text}</p>
                                <Link to={loginData[language].loginContainer.firstVisit.to}>{loginData[language].loginContainer.firstVisit.link}</Link>
                            </div>
                            <div className="captcha">
                                <p>{loginData[language].loginContainer.disclaimer.text} <Link to="TO BE DEFINE">{loginData[language].loginContainer.disclaimer.link}</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer data={loginData[language].footer} options={options} language={language} changeLanguage={changeLanguage} />
            </div>
        </div>
    )
}

export default Login
