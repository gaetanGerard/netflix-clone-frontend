import React from 'react';

// Import Styles
import "../../styles/select.scss";

const Select = ({options, onchange, selectedLanguage}) => {
    // To fix for when the language is selected so its select in every select box on the site
    return (
        <div className="select-arrow">
            <select name="cars" onChange={onchange}>
                {options.map((option, i) => (
                    <option value={option} key={i++}>{option}</option>
                ))}

            </select>
        </div>
    )
}

export default Select