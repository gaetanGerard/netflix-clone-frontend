import React, { ChangeEvent } from 'react';

// Import Styles
import "../../styles/select.scss";

interface Option {
    label: string,
    iso: string
}

type SelectProps = {
    options: Option[],
    onchange: (e: ChangeEvent<HTMLSelectElement>) => void,
    selected: string,
    name: string
}

const Select = ({options, onchange, selected, name}: SelectProps): JSX.Element => {
    return (
        <div className="select-arrow">
            <select name={name} onChange={onchange} defaultValue={selected ? selected : ''}>
                {options.map((option, i) => (
                    <option value={option.iso} selected={option.label === selected ? true : false} key={i++}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default Select