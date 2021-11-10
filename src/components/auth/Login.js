import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Import Custom Components
import Select from '../ui/Select';
import Typography from '../ui/Typography';
import InputText from '../ui/InputText';

// Import Logo
import Logo from '../ui/Logo';

const Login = ({ language, data, changeLanguage, options, onSubmit }) => {
    document.title = data[language].documentTitle
    const [userEmail, setUserEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberMe, setRememberMe] = useState(true);

    console.log(data[language])

    const onChange = (e) => {
        if(e.target.name === "userEmail") setUserEmail(e.target.value);
        if(e.target.name === "password") setPassword(e.target.value);
        if(e.target.name === "rememberMe") setRememberMe(e.target.checked)
    }

    const onClick = (e) => {
        e.preventDEfault()
        const data = {userEmail, password, rememberMe};
        onSubmit(data);
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <header>
                    <Link to="/"><Logo classname="svg-icon svg-icon-netflix-logo nfLogo" /></Link>
                </header>
                <div className="login-body-container">
                    <div className="login-body">
                        <Typography HTMLElement="h2" classname="title">{data[language].loginContainer.title}</Typography>
                        <div className="form-wrapper">
                            <InputText fieldName="login-email" type="text" name="userEmail"   onChange={onChange} label={data[language].loginContainer.userNameInput.label} errorMsg={data[language].loginContainer.userNameInput.helperText} />
                            <InputText fieldName="login-password" type="password" name="password" onChange={onChange}   label={data[language].loginContainer.userPasswordInput.label} errorMsg={data[language].loginContainer.userPasswordInput.helperText} />
                            <Link to="/home" onClick={(e) => onClick(e)} className="btn login-btn">{data[language].loginContainer.buttonText}</Link>
                            <div className="rememberOrHelp">
                                <div className="checkbox">
                                    <input type="checkbox"  name="rememberMe" defaultChecked={rememberMe} onChange={e => onChange(e)} />
                                    <label htmlFor="rememberMe">{data[language].loginContainer.checkbox}</label>
                                </div>
                                <Link to="/help">{data[language].loginContainer.helpLink}</Link>
                            </div>
                        </div>
                        <div className="other-login-method">
                            <div className="with-fb">
                                <div className="fb-icon"></div>
                                <p>{data[language].loginContainer.loginWithFB}</p>
                            </div>
                            <div className="new-to-netflix">
                                <p>{data[language].loginContainer.firstVisit.text}</p>
                                <Link to={data[language].loginContainer.firstVisit.to}>{data[language].loginContainer.firstVisit.link}</Link>
                            </div>
                            <div className="captcha">
                                <p>{data[language].loginContainer.disclaimer.text} <Link to="TO BE DEFINE">{data[language].loginContainer.disclaimer.link}</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="site-footer">
                        <Typography HTMLElement="p" classname="phone-number">{data[language].footer.title} <a href={`tel:${data[language].footer.tel}`}>{data[language].footer.tel}</a></Typography>
                        <div className="site-footer-link">
                            {data[language].footer["column-link"].map((col, i) => (
                                <div className="col" key={`footer-login-link-col${i++}`}>
                                    {col.map((row, j) => (
                                        <a href="TO BE DEFINE" className="row" key={`footer-login-link-row-${j++}`}>{row}</a>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <Select options={options} name="language" selected={language} onchange={(e) => changeLanguage(e)} />
                    </div>

                </footer>
            </div>
        </div>
    )
}

export default Login
