import React from 'react';

// Import Custom Components
import Select from '../ui/Select';
import Typography from '../ui/Typography';

// Import Logo
import Logo from '../ui/Logo';

const Login = ({ language, data, changeLanguage, options }) => {
    document.title = data[language].documentTitle

    console.log(data[language])

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <header>
                    <Logo classname="svg-icon svg-icon-netflix-logo nfLogo" />
                </header>
                <div className="login-body-container">
                    <div className="login-body">

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
