import React from 'react';

// Import Styles
import "../../styles/select.scss";

const Select = ({options, onchange, selected, name}) => {
    return (
        <div className="select-arrow">
            <select name={name} onChange={onchange} value={selected ? selected : ''}>
                {options.map((option, i) => (
                    <option value={option} key={i++}>{option}</option>
                ))}

            </select>
        </div>
    )
}

export default Select