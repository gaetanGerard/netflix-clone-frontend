import React, { ChangeEvent } from 'react';

// Import Styles
import "../../styles/select.scss";

interface Option {
    label?: string,
    iso?: string,
    season_number?: number
    name?: string
}

type SelectProps = {
    options: Option[],
    onchange: (e: ChangeEvent<HTMLSelectElement>) => void,
    selected: string,
    name: string,
}

type CurrentChoice = Option | undefined;

const Select = ({options, onchange, selected, name}: SelectProps): JSX.Element => {
    const currentChoice  = options.find(option => option.label === selected);

    return (
        <div className="select-arrow">
            <select name={name} onChange={onchange} value={selected ? currentChoice?.iso : ''}>
                {options.map((option, i) => (
                    <option value={option.iso ? option.iso : option.season_number} key={i++}>{option.label ? option.label : option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select