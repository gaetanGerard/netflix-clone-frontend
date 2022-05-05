import React, { ReactNode } from 'react';

type BtnProps = {
    btnType: "button" | "submit" | "reset" | undefined,
    classname: string,
    children: ReactNode,
    onclick: (e) => void,
    disabled?: boolean,
    name?: string
}

const Button = ({ btnType, classname, children, onclick, disabled, name }: BtnProps): JSX.Element => {
    return (
        <button type={btnType} className={classname} disabled={disabled} onClick={onclick} name={name}>
            {children}
        </button>
    )
}

export default Button