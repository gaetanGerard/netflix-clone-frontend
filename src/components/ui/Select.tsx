import React, { ChangeEvent } from 'react';

// Import Styles
import "../../styles/select.scss";

type SelectProps = {
    options: string[],
    onchange: (e: ChangeEvent<HTMLSelectElement>) => void,
    selected: string,
    name: string
}

const Select = ({options, onchange, selected, name}: SelectProps): JSX.Element => {
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