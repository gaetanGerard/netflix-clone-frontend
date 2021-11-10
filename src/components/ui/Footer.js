import React from 'react';

// Import Custom Components
import Select from "./Select";

// Import Styles
import "../../styles/footer.scss";

const Footer = ({ data, options, language, changeLanguage }) => {
    return (
        <footer>
            <div className="site-footer">
                <p className="phone-number">{data.title} <a href={`tel:${data.tel}`}>{data.tel}</a></p>
                <div className="site-footer-link">
                    {data["column-link"].map((col, i) => (
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
    )
}

export default Footer
