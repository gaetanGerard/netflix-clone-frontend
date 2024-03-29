import React, { ChangeEvent, useState, useEffect } from 'react';

// Import Custom Components
import Select from "./Select";

// Import Styles
import "../../styles/footer.scss";

// Import Types
import { LanguageOptions } from '../../types/languageTypes';

type FooterProps = {
    data: any,
    options: LanguageOptions[],
    language: string,
    changeLanguage: (e?: ChangeEvent<HTMLSelectElement> | undefined) => void,
}

const Footer = ({ data, options, language, changeLanguage }: FooterProps) => {
    // if a profile is present so disable language select for change language base on profile instead
    // otherwise no profile selected and so default app language take over
    const [disableSelect, setDisableSelect] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('profileSave')) {
            setDisableSelect(true);
        }
    }, [])

    return (
        <footer>
            <div className="site-footer">
                <p className="phone-number">{data.title} <a href={`tel:${data.tel}`}>{data.tel}</a></p>
                <div className="site-footer-link">
                    {data["column-link"].map((col: string[], i: number) => (
                        <div className="col" key={`footer-login-link-col${i++}`}>
                            {col.map((row, j) => (
                                <a href="TO BE DEFINE" className="row" key={`footer-login-link-row-${j++}`}>{row}</a>
                            ))}
                        </div>
                    ))}
                </div>
                {disableSelect ? null : (<Select options={options} name="language" selected={language} onchange={(e?: ChangeEvent<HTMLSelectElement>) => changeLanguage(e)} />)}
            </div>
        </footer>
    )
}

export default Footer
